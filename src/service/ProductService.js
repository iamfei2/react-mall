//by ly 我的商品数据是活的，可能需要修改一个
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
        genreId: 8,
        brandId: 4,
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
        genreId: 8,
        brandId: 4,
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
        genreId: 3,
        brandId: 3,
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
        brandId: 3,
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
        genreId: 3,
        brandId: 3,
        price: 98,
        inventory: 275,
        isSeckill: true,
        isRecommend: false,
        src: product7,
        detailSrc: productDatail,
    },
    {
        id: 8,
        name: `小米（MI）小米电视4A `,
        title: '小米（MI）小米电视4A 55英寸 L55M5-AZ/L55M5-AD 2GB+8GB HDR 4K超高清 人工智能网络液晶平板电视',
        genreId: 14,
        brandId: 1,
        price: 2499,
        inventory: 85,
        isSeckill: false,
        isRecommend: true,
        src: product8,
        detailSrc: productDatail,
    },
    {
        id: 9,
        name: `小米（MI）小米电视4A 65英寸`,
        title: ' L65M5-AZ/L65M5-AD 2GB+8GB HDR 4K超高清 人工智能网络液晶平板电视',
        genreId: 14,
        brandId: 1,
        price: 2499,
        inventory: 85,
        isSeckill: false,
        isRecommend: true,
        src: product9,
        detailSrc: productDatail,
    },
    {
        id: 10,
        name: `Apple iPhone 14 (A2884) 128GB 支持移动联通电信5G 双卡双待手机`,
        title: '【11.11大爱超大爱】指定iPhone14产品限时限量领券立减601元！！！部分iPhone产品现货抢购确认收货即送原厂手机壳10元优惠券！！！猛戳 ',
        genreId: 8,
        brandId: 4,
        price: 5999,
        inventory: 75,
        isSeckill: false,
        isRecommend: true,
        src: product10,
        detailSrc: productDatail,
    },
    {
        id: 11,
        name: `Apple iPad 10.9英寸平板电脑 2022年款`,
        title: '【11.11大爱超大爱】iPad9代限量抢购，价格优惠，更享以旧换新至高补贴325元！！快来抢购吧！！  ',
        genreId: 8,
        brandId: 4,
        price: 3599,
        inventory: 77,
        isSeckill: false,
        isRecommend: true,
        src: product11,
        detailSrc: productDatail,
    },
    {
        id: 12,
        name: `小米 Xiaomi Book Pro 14 2022 锐龙版 2.8K超清大师屏 高端轻薄笔记本电脑`,
        title: '【双十一大促来袭】指定型号至高优惠1000，以旧换新至高补贴1000元，晒单赢好礼',
        genreId: 32,
        brandId: 1,
        price: 5599,
        inventory: 49,
        isSeckill: false,
        isRecommend: true,
        src: product12,
        detailSrc: productDatail,
    },
    {
        id: 13,
        name: `小米12 Pro 天玑版 天玑9000+处理器 5000万疾速影像 2K超视感屏 120Hz高刷 67W快充`,
        title: '天玑9000+处理器、5160mAh大电量、2KAmoled超视感屏【点击购买小米11Ultra，戳】',
        genreId: 8,
        brandId: 1,
        price: 2999,
        inventory: 17,
        isSeckill: false,
        isRecommend: true,
        src: product13,
        detailSrc: productDatail,
    },
    {
        id: 14,
        name: `Redmi K50 天玑8100 2K柔性直屏 OIS光学防抖 67W快充 5500mAh大电量`,
        title: '【品质好物】天玑8100，2K直屏，5500mAh大电量【Note12Pro火热抢购中 ',
        genreId: 8,
        brandId: 1,
        price: 2099,
        inventory: 33,
        isSeckill: false,
        isRecommend: true,
        src: product14,
        detailSrc: productDatail,
    },
    {
        id: 15,
        name: `HUAWEI Mate 50 直屏旗舰 超光变XMAGE影像 北斗卫星消息`,
        title: '【华为Mate50新品上市】内置66W华为充电套装，超光变XMAGE影像,北斗卫星消息，鸿蒙操作系统3.0！立即抢购！华为新品可持续计划，猛戳》  ',
        genreId: 8,
        brandId: 6,
        price: 4999,
        inventory: 95,
        isSeckill: false,
        isRecommend: true,
        src: product15,
        detailSrc: productDatail,
    },
    {
        id: 16,
        name: `万和（Vanward)燃气热水器天然气家用四重防冻直流变频节能全新升级增压水伺服恒温高抗风`,
        title: '【家电11.11享低价，抢到手价不高于1199】【发布种草秀享好礼！同价11.11买贵补差】爆款超一级能效零冷水】 ',
        genreId: 18,
        brandId: 7,
        price: 1799,
        inventory: 177,
        isSeckill: false,
        isRecommend: true,
        src: product16,
        detailSrc: productDatail,
    },
    {
        id: 17,
        name: `三星（SAMSUNG）500GB SSD固态硬盘 M.2接口(NVMe协议)`,
        title: '【满血无缓存！进店抽百元E卡，部分型号白条三期免息】兼具速度与可靠性！读速高达3500MB/s，全功率模式！点击 ',
        genreId: 33,
        brandId: 5,
        price: 3599,
        inventory: 55,
        isSeckill: false,
        isRecommend: true,
        src: product17,
        detailSrc: productDatail,
    },
    {
        id: 18,
        name: `OPPO Reno8 8GB+128GB 鸢尾紫 新配色上市 80W超级闪充 5000万水光人像三摄`,
        title: '【11.11提前购机享价保，好货不用等，系统申请一键价保补差!】【Reno8Pro爆款优惠】',
        genreId: 8,
        brandId: 2,
        price: 2299,
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

    // getDisplayMenus() {
    //     const buildTree = (menuList, parentId = 0) => {
    //         return menuList
    //             .filter((menu) => menu.enable && menu.parent === parentId)
    //             .map((menu) => {
    //                 const children = buildTree(menuList, menu.id);
    //                 return {
    //                     ...menu,
    //                     children: children.length ? children : undefined,
    //                 };
    //             });
    //     };
    //     return buildTree(this.menuList);
    // }
    //
    // addMenu(menu) {
    //     menu.id = this.menuList.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
    //     this.menuList.push(menu);
    //     this._setData();
    // }
    //
    // editMenu(menu) {
    //     const index = this.menuList.findIndex((m) => m.id === menu.id);
    //     if (index !== -1) {
    //         if (this.menuList[index].locked) {
    //             return;
    //         }
    //         this.menuList[index] = menu;
    //         this._setData();
    //     }
    // }
    //
    // deleteMenu(id) {
    //     const index = this.menuList.findIndex((menu) => menu.id === id);
    //     if (index !== -1) {
    //         if (this.menuList[index].locked) {
    //             return;
    //         }
    //         this.menuList.splice(index, 1);
    //         this._setData();
    //     }
    // }

    _getData() {
        // const data = localStorage.getItem('mallGenreList');
        // if (data) {
        //     this.mallGenreList = JSON.parse(data);
        // } else {
        //     this.mallGenreList = defaultMallGenreList;
        //     this._setData();
        // }

        this.productList = defaultProductList;
        this._setData();

    }

    _setData() {
        localStorage.setItem('productList', JSON.stringify(this.productList));
    }
}

export default ProductService;
