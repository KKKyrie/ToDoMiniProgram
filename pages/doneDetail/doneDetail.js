const app = getApp();

Page({

	data: {
		todo: '',
		remark: '',
		stamp: ''
	},

	onLoad: function(options) {
		let _todo = decodeURIComponent(options.todo);
		let _remark = decodeURIComponent(options.remark);
		let _stamp = decodeURIComponent(options.stamp);
		this.getItemInfo(_todo, _remark, _stamp);
	},

	getItemInfo: function(_todo, _remark, _stamp) {
		this.setData({
			todo: _todo,
			remark: _remark,
			stamp: _stamp
		});
	}

});