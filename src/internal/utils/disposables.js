export function disposables() {
	let disposables = [];
	let queue = [];

	let api = {
		enqueue(fn) {
			queue.push(fn);
		},

		requestAnimationFrame(...args) {
			let raf = requestAnimationFrame(...args);
			api.add(() => cancelAnimationFrame(raf));
		},

		nextFrame(...args) {
			api.requestAnimationFrame(() => {
				api.requestAnimationFrame(...args);
			});
		},

		setTimeout(...args) {
			let timer = setTimeout(...args);
			api.add(() => clearTimeout(timer));
		},

		add(cb) {
			disposables.push(cb);
		},

		dispose() {
			for (let dispose of disposables.splice(0)) {
				dispose();
			}
		},

		async workQueue() {
			for (let handle of queue.splice(0)) {
				await handle();
			}
		}
	};

	return api;
}
