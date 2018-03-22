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
	},

	deleteTap: function() {
		let that = this;
		that.deleteTodo();
	},

	// 删除事项
	deleteTodo: function() {
		let todoList = app.globalData.todoList;
		let stamp = this.data.stamp;
		let targetIndex = -1;
		for (let [_index, _todo] of todoList.entries()) {
			if (_todo.timeStamp == stamp) {
				targetIndex = _index;
				break;
			}
		}

		if (targetIndex === -1) {
			console.log('404 Not Find');
			return;
		} else {
			// delete todo
			let trash = todoList.splice(targetIndex, 1);
		}

		// 写入 localStorage
		wx.setStorage({
			key: 'userTodoList',
			data: JSON.stringify(todoList),
			success: function() {
				// 删除成功
				app.globalData.todoList = todoList;
				wx.reLaunch({
					url: '../index/index',
					success: function() {},
					fail: function() {
						wx.navigateBack({
							delta: 1
						});
					}
				});
			},
			fail: function() {
				// 删除失败
				wx.showToast({
					title: '删除失败',
					duration: 1500
				});
			}
		});

	},

});