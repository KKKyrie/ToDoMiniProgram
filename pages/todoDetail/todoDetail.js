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
		wx.showModal({
			title: '请三思',
			content: '真的要删除吗？',
			showCancel: true,
			cancelText: '不删了',
			cancelColor: '#8a8a8a',
			confirmText: '真的',
			confirmColor: '#5cbaea',
			success: function(res) {
				if (res.confirm) {
					// 删除
					that.deleteTodo();
				} else if (res.cancel) {
					// 取消
				}
			}
		});
	},

	completeTap: function() {
		let that = this;
		wx.showModal({
			title: 'lie to me',
			content: '真的完成了吗？',
			showCancel: true,
			cancelText: '打扰了',
			cancelColor: '#8a8a8a',
			confirmText: '骗你是猪',
			confirmColor: '#5cbaea',
			success: function(res) {
				if (res.confirm) {
					// 标记已完成
					that.completeTodo();
				} else if (res.cancel) {
					// 取消
				}
			}
		});
	},

	// 删除事项
	deleteTodo: function() {
		let todoList = app.globalData.todoList;
		let stamp = this.data.stamp;
		console.log(stamp);
		let targetIndex = -1;
		for (let [_index, _todo] of todoList.entries()) {
			if (_todo.timeStamp === stamp) {
				targetIndex = _index;
				break;
			}
		}

		if (targetIndex === -1) {
			return;
		} else {
			// delete todo
			let trash = todoList.splice(targetIndex, 1);
		}

		// 写入 localStorage
		wx.setStorage({
			key: 'userTodoList',
			data: JSON.stringify(todoList),
			success: function(){
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
			fail: function(){
				// 删除失败
				wx.showToast({
					title: '删除失败',
					duration: 1500
				});
			}
		});

	},


	// 将 todo 标记为已完成
	completeTodo: function() {
		let todoList = app.globalData.todoList;
		let stamp = this.data.stamp;
		for (let _todo of todoList) {
			if (_todo.timeStamp === stamp) {
				_todo.isDone = true;
				break;
			}
		}

		// 写入 localStorage
		wx.setStorage({
			key: 'userTodoList',
			data: JSON.stringify(todoList),
			success: function(){
				// 状态修改成功
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
			fail: function(){
				// 状态修改失败
				wx.showToast({
					title: '删除失败',
					duration: 1500
				});
			}
		});
	}


});