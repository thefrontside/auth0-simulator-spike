import { Operation, Task } from 'effection';
import type { Process } from '@effection/node';
import { main, exec, daemon, StdIO } from '@effection/node';
import { sleep } from 'effection';
import type { Channel } from 'effection';
import { on } from 'effection';
import { watch } from 'chokidar';

main(function* (scope: Task) {
  const watcher = watch('./src/**/*.ts', { ignoreInitial: true, ignored: 'dist' });
  try {
    let process: Task = scope.spawn(buildAndRun(500));

    yield on(watcher, 'all').forEach(function () {
      console.log('buidling.....');
      process.halt();
      process = scope.spawn(buildAndRun(500));
    });
  } finally {
    watcher.close();
  }
});

function writeOut(channel: Channel<string>, out: NodeJS.WriteStream) {
  return channel.forEach(function (data) {
    return new Promise((resolve, reject) => {
      out.write(data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

function executeAndOut(command: string): Operation<void> {
  return function* (task) {
    const p: Process = exec(task, `yarn run ${command}`);
    task.spawn(writeOut(p.stdout, process.stdout));
    task.spawn(writeOut(p.stderr, process.stderr));
    yield p.expect();
  };
}

function buildAndRun(delay: number): Operation<void> {
  return function* (scope) {
    try {
      yield executeAndOut('build');
      yield sleep(delay);
      const server: StdIO = daemon(scope, 'node dist/start.js');
      scope.spawn(writeOut(server.stdout, process.stdout));
      scope.spawn(writeOut(server.stderr, process.stderr));
    } catch (err) {
      console.error(err);
    }

    yield;
  };
}
