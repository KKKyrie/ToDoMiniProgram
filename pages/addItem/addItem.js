const app = getApp();

Page({
	data: {
		todo: '',
		remark: ''
	},

	onLoad: function() {},

	// 用户输入待办事项
	inputTodo: function(ev) {
		let that = this;
		that.setData({
			todo: ev.detail.value
		});
	},

	// 用户输入备注
	inputRemark: function(ev) {
		let that = this;
		that.setData({
			remark: ev.detail.value
		});
	},

	checkInput: function() {
		/*
		 * 检测用户输入
		 * 1. 是否包含非法字符
		 * 2. 是否为空
		 * 3. 是否超出长度限制
		 */
		let that = this;
		let _todo = that.data.todo;
		let _remark = that.data.remark;
		let showToastFlag = false;
		let toastWording = '';
		let toastImage = '';

		if (that.checkEmpty(_todo)) {
			// 输入为空
			showToastFlag = true;
			toastWording = '事项不能为空';
			toastImage = '../../images/index/infoIcon.png';
		} else if (that.checkIllegal(_todo) || that.checkIllegal(_remark)) {
			// 输入还有非法字符
			showToastFlag = true;
			toastWording = '含有非法字符';
			toastImage = '../../images/index/noFlash.png';
		} else if (_todo.length > 50 || _remark.length > 200) {
			// 长度超出限制
			showToastFlag = true;
			toastWording = '你是怎么输入这么多字的？';
			toastImage = '../../images/index/face.png';
		}

		if (showToastFlag) {
			wx.showToast({
				title: toastWording,
				icon: 'none',
				image: toastImage,
				duration: 1500,
				mask: true
			});
			return false;
		} else {
			return true;
		}
	},

	checkIllegal: function(input) {
		let patern = /[`#^<>:"?{}\/;'[\]]/im;
		let _result = patern.test(input);
		return _result;
	},

	checkEmpty: function(input) {
		return input === '';
	},

	addButtonTap: function() {
		// 点击“添加按钮”
		let that = this;
		if (!that.checkInput()) {
			return;
		}

		let todo = that.data.todo;
		let remark = that.data.remark;
		let timeStamp = Date.now();
		let todoList = app.globalData.todoList;

		let item = {
			key: 'key_' + timeStamp.toString(),
			todo: todo,
			isDone: false,
			remark: remark,
			timeStamp: timeStamp.toString()
		};

		let newList = [...todoList, item];

		wx.setStorage({
			key: 'userTodoList',
			data: JSON.stringify(newList),
			success: function() {
				// 添加成功
				app.globalData.todoList = newList;
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
				// 添加失败
				wx.showToast({
					title: '添加失败',
					duration: 1500
				});
			}
		});

	}
});