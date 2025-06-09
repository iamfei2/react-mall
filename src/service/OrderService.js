/**
 * =============================================
 * 订单服务类 - 管理订单数据的增删改查
 * =============================================
 *
 * @status 0: 未发货, 1: 已发货
 */
const defaultOrderList = [
    {
        id: 1,
        productName: '零食大礼包',
        orderNumber: '123456',
        customerName: 'Customer1',
        price: '￥366',
        amount: 2,
        status: 0,
        storeName: '零食大礼包',
        image: '/product1.png'
    },
    {
        id: 2,
        productName: '美的吹风机',
        orderNumber: '456789',
        customerName: 'Customer1',
        price: '￥66',
        storeName: '美的',
        status: 1,
        amount: 1,
        image: '/product2.jpg'
    }
];

class OrderService {
    constructor() {
        this.orderList = [];
        this._initData();
    }

    // ----------------------------------------
    // 初始化方法
    // ----------------------------------------

    /**
     * 初始化订单数据
     */
    _initData() {
        try {
            const storedData = localStorage.getItem('orderList');
            this.orderList = storedData
                ? JSON.parse(storedData)
                : [...defaultOrderList];
            this._persistData();
        } catch (error) {
            console.error('订单数据初始化失败:', error);
            this.orderList = [...defaultOrderList];
            this._persistData();
        }
    }

    /**
     * 持久化订单数据到本地存储
     */
    _persistData() {
        localStorage.setItem('orderList', JSON.stringify(this.orderList));
    }

    // ----------------------------------------
    // 公共API方法
    // ----------------------------------------

    /**
     * 获取所有订单
     * @returns {Array} 订单列表
     */
    getOrders() {
        return [...this.orderList];
    }

    /**
     * 添加新订单
     * @param {Object} newOrder - 新订单对象
     * @returns {Object} 添加的订单
     */
    addNewOrder(newOrder) {
        const id = this.orderList.length > 0
            ? Math.max(...this.orderList.map(o => o.id)) + 1
            : 1;

        const timestamp = new Date();
        const orderNumber = timestamp
            .toISOString()
            .replace(/[-T:]/g, '')
            .split('.')[0];

        const order = {
            ...newOrder,
            id,
            orderNumber,
            createdAt: timestamp.toISOString()
        };

        this.orderList.push(order);
        this._persistData();
        return order;
    }

    /**
     * 删除订单
     * @param {number} id - 订单ID
     */
    deleteOrder(id) {
        this.orderList = this.orderList.filter(order => order.id !== id);
        this._persistData();
    }

    /**
     * 更新订单发货状态
     * @param {number} id - 订单ID
     * @param {number} status - 新的状态 (0: 未发货, 1: 已发货)
     * @returns {Object|null} 更新后的订单对象或null
     */
    updateOrderStatus(id, status) {
        const index = this.orderList.findIndex(order => order.id === id);

        if (index !== -1) {
            const updatedOrder = {
                ...this.orderList[index],
                status,
                updatedAt: new Date().toISOString()
            };

            this.orderList[index] = updatedOrder;
            this._persistData();
            return updatedOrder;
        }
        return null;
    }

    /**
     * 处理发货操作
     * @param {number} id - 订单ID
     */
    handleShip(id) {
        this.updateOrderStatus(id, 1);
    }
}

export default OrderService;
