const app = getApp();

Page({

	data: {
		todo: '',
		remark: '',
	},

	onLoad: function(options) {
		let _todo = decodeURIComponent(options.todo);
		let _remark = decodeURIComponent(options.remark);
		this.getItemInfo(_todo, _remark);
	},

	getItemInfo: function(_todo, _remark) {
		this.setData({
			todo: _todo,
			remark: _remark
		});
	}

});