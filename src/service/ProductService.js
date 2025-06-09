import product1 from "./images/product1.png"
import product2 from "./images/product2.png"
import product3 from "./images/product3.png"
import product4 from "./images/product4.png"
import product5 from "./images/product5.png"
import product6 from "./images/product6.png"
import product7 from "./images/product7.png"
import product8 from "./images/product8.png"
import product9 from "./images/product9.png"
import product10 from "./images/product10.png"
import product11 from "./images/product11.png"
import product12 from "./images/product12.png"
import product13 from "./images/product13.png"
import product14 from "./images/product14.png"
import product15 from "./images/product15.png"
import product16 from "./images/product16.png"
import product17 from "./images/product17.png"
import product18 from "./images/product18.png"
import product19 from "./images/product19.png"
import productDatail from "./images/productDetail.jpg"
const defaultProductList = [
    {
        id: 0,
        name: `三只松鼠坚果礼`,
        title: '礼盒内汇聚了来自世界各地的优质坚果，开心果、腰果、巴旦木、核桃等应有尽有，每一颗都精心挑选，颗颗饱满，散发着诱人的光泽。咬上一口，丰富的口感在舌尖绽放，坚果的香脆瞬间征服味蕾。',
        genreId: 12,
        brandId: 1,
        price: 888,
        inventory: 238,
        isSeckill: true,
        isRecommend: false,
        src: product19,
        detailSrc: productDatail,
    },
    {
        id: 1,
        name: `零食大礼包`,
        title: '薯片的酥脆、巧克力的丝滑、坚果的香脆、糖果的甜蜜，还有各种意想不到的美味，统统汇聚一堂。',
        genreId: 8,
        brandId: 1,
        price: 666,
        inventory: 100,
        isSeckill: true,
        isRecommend: false,
        src: product1,
        detailSrc: productDatail,
    },
    {
        id: 2,
        name: `威龙辣条礼包`,
        title: '卫龙辣条礼包精心挑选了多种不同风味的零食，堪称零食界的 “全明星阵容”。每一款都有其独特的风味和口感，满足你对不同口感和味道的需求。',
        genreId: 8,
        brandId: 3,
        price: 399,
        inventory: 150,
        isSeckill: true,
        isRecommend: false,
        src: product2,
        detailSrc: productDatail,
    },
    {
        id: 3,
        name: `旺旺大礼包`,
        title: '旺旺大礼包内通常包含了旺旺集团旗下的多种经典零食，无论是小孩、年轻人还是老年人，都能在其中找到自己喜欢的零食。',
        genreId: 8,
        price: 555,
        inventory: 155,
        isSeckill: true,
        isRecommend: false,
        src: product3,
        detailSrc: productDatail,
    },
    {
        id: 4,
        name: `佳能r8`,
        title: '佳能 R8 搭载约 2420 万像素的全画幅 CMOS 图像感应器，让你在任何光线条件下都能创作自如。',
        genreId: 27,
        price: 3499,
        inventory: 175,
        isSeckill: true,
        isRecommend: false,
        src: product4,
        detailSrc: productDatail,
    },
    {
        id: 5,
        name: `U2DW`,
        title: 'U2DW 强势登场，成为你工作与娱乐的绝佳搭档！支持蓝牙和 2.4G 无线连接，轻松应对多设备使用场景。',
        genreId: 2,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product5,
        detailSrc: productDatail,
    },
    {
        id: 6,
        name: `rog`,
        title: 'ROG 幻 Air 系列定会让你爱不释手',
        genreId: 3,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product6,
        detailSrc: productDatail,
    },
    {
        id: 7,
        name: `罗技`,
        title: '罗技都能提供契合需求的优质产品，陪伴大家解锁科技生活的无限精彩 。',
        genreId: 2,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product7,
        detailSrc: productDatail,
    },
    {
        id: 8,
        name: `舒克g5pro电动牙刷 `,
        title: '舒克 G5 Pro 电动牙刷，将先进科技与贴心设计完美融合，全方位守护你的口腔健康。',
        genreId: 20,
        brandId: 2,
        price: 1499,
        inventory: 85,
        isSeckill: false,
        isRecommend: true,
        src: product8,
        detailSrc: productDatail,
    },
    {
        id: 9,
        name: `舒克牙膏`,
        title: '舒克牙膏，以专业科技为支撑，用贴心配方呵护每一口腔',
        genreId: 20,
        brandId: 2,
        price: 199,
        inventory: 85,
        isSeckill: false,
        isRecommend: true,
        src: product9,
        detailSrc: productDatail,
    },
    {
        id: 10,
        name: `舒克电动牙刷`,
        title: '选择舒克，就是选择全方位的口腔护理专家，为您和家人的口腔健康保驾护航， ',
        genreId: 20,
        brandId: 2,
        price: 699,
        inventory: 75,
        isSeckill: false,
        isRecommend: true,
        src: product10,
        detailSrc: productDatail,
    },
    {
        id: 11,
        name: `全新旗舰级头戴式耳机 Beoplay H100`,
        title: 'Beoplay H100，集卓越音质、智能体验、便捷操作、持久续航与时尚外观于一身！  ',
        genreId: 4,
        price: 1599,
        inventory: 77,
        isSeckill: false,
        isRecommend: true,
        src: product11,
        detailSrc: productDatail,
    },
    {
        id: 12,
        name: `珂芝G68 SE飘带版磁轴游戏键盘`,
        title: '升级不加价-兼容多种磁轴 | 珂芝G68 SE飘带版磁轴游戏键盘',
        genreId: 3,
        price: 699,
        inventory: 49,
        isSeckill: false,
        isRecommend: true,
        src: product12,
        detailSrc: productDatail,
    },
    {
        id: 13,
        name: `SONY索尼耳机`,
        title: '适合在安静环境下使用，如工位、室内等，降噪和音质都能让你满意',
        genreId: 4,
        price: 2999,
        inventory: 17,
        isSeckill: false,
        isRecommend: true,
        src: product13,
        detailSrc: productDatail,
    },
    {
        id: 14,
        name: `RK S98三模机械键盘-黑莓版`,
        title: '这款键盘配备了1.4英寸TFT大显示屏，操作更便捷。CNC金属材质的旋钮设计，使得切换连接模式、灯光和音量等操作更加快捷。',
        genreId: 3,
        price: 2099,
        inventory: 33,
        isSeckill: false,
        isRecommend: true,
        src: product14,
        detailSrc: productDatail,
    },
    {
        id: 15,
        name: `DJI大疆超旗舰画质运动相机OSMO ACTION 5 PRO `,
        title: 'DJI 大疆超旗舰画质运动相机 OSMO ACTION 5 PRO 震撼来袭，为你的创作梦想插上翅膀，带你解锁全新视觉记录体验！ ',
        genreId: 26,
        brandId: 4,
        price: 4999,
        inventory: 95,
        isSeckill: false,
        isRecommend: true,
        src: product15,
        detailSrc: productDatail,
    },
    {
        id: 16,
        name: `佳能.佳能m6mark2 二代 m62 vlog微单相机`,
        title: '别烦恼，佳能 M6 Mark II 二代 vlog 微单相机强势登场，为你开启创作新世界大门，解锁记录生活的无限可能！ ',
        genreId: 27,
        price: 1799,
        inventory: 177,
        isSeckill: false,
        isRecommend: true,
        src: product16,
        detailSrc: productDatail,
    },
    {
        id: 17,
        name: `奥林巴斯便携ccd相机fe310`,
        title: '轻巧便携的机身、出色的画质、丰富的功能以及简便的操作，成为记录生活点滴、探索摄影乐趣的绝佳伙伴。 ',
        genreId: 28,
        price: 3599,
        inventory: 55,
        isSeckill: false,
        isRecommend: true,
        src: product17,
        detailSrc: productDatail,
    },
    {
        id: 18,
        name: `美的MB-AJ0501电吹风机`,
        title: '美的MB-AJ0501电吹风机家用负离子护发大功率速干发廊专用宿舍',
        genreId: 22,
        price: 149,
        inventory: 71,
        isSeckill: false,
        isRecommend: true,
        src: product18,
        detailSrc: productDatail,
    },

];
class ProductService {
    productList = [];

    constructor() {
        this._getData();
    }

    getProductList() {
        return this.productList.concat();
    }


    getProductsByGenreId(id) {
        return this.productList.find((product) => product.genreId === id);
    }

    getProductById(id) {
        return this.productList.find(product => product.id === parseInt(id));
    }



    _getData() {


        this.productList = defaultProductList;
        this._setData();

    }

    _setData() {
        localStorage.setItem('productList', JSON.stringify(this.productList));
    }
}

export default ProductService;
