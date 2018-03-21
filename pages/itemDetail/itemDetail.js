Page({

	data: {
		todo: '',
		remark: ''
	},

	onLoad: function(options){
		let _todo = options.todo;
		let _remark = options.remark;
		this.getItemInfo(_todo, _remark);
	},

	getItemInfo: function(_todo, _remark){
		this.setData({
			todo: _todo,
			remark: _remark
		});
	}

});