Page({

	data: {
		todo: '',
		remark: '',
	},

	onLoad: function(options) {
		let _todo = options.todo;
		let _remark = options.remark;
		let _isDone = options.done;
		console.log(_isDone);
		this.getItemInfo(_todo, _remark);
	},

	getItemInfo: function(_todo, _remark, _isDone) {
		this.setData({
			todo: _todo,
			remark: _remark,
			isDone: _isDone
		});
	}

});