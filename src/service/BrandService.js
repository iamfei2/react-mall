//by ly
import xiaomi from "./images/xiaomi.png"
import septwolves from "./images/septwolves.png"
import hla from "./images/hla.png"
import apple from "./images/apple.png"
import sumsung from "./images/sumsung.png"
import huawei from "./images/huawei.png"
import gree from "./images/gree.png"
import fotile from "./images/fotile.png"
import vanward from "./images/vanward.png"
import oppo from "./images/oppo.png"
import nike from "./images/nike.png"
const defaultBrandList = [
    {
        id:1,
        frontName: `xiaomi`,
        name: `小米`,
        src: xiaomi,
        story:'小米公司正式成立于2010年4月，是一家专注于高端智能手机、互联网电视自主研发的创新型科技企业。主要由前谷歌、微软、摩托、金山等知名公司的顶尖人才组建。'
    },
    {
        id:2,
        frontName: `oppo`,
        name: `oppo`,
        src: oppo,
        story:'OPPO于2008年推出第一款“笑脸手机”，由此开启探索和引领至美科技之旅。今天，OPPO凭借以Find和R系列手机为核心的智能终端产品，以及OPPO+等互联网服务，让全球消费者尽享至美科技。'
    },
    {
        id:3,
        frontName: `hla`,
        name: `海澜之家`,
        src: hla,
        story:'“海澜之家”（英文缩写：HLA）是海澜之家股份有限公司旗下的服装品牌，总部位于中国江苏省无锡市江阴市，主要采用连锁零售的模式，销售男性服装、配饰与相关产品。'
    },
    {
        id:4,
        frontName: `apple`,
        name: `苹果`,
        src: apple,
        story:'苹果公司(Apple Inc. )是美国的一家高科技公司。 由史蒂夫·乔布斯、斯蒂夫·沃兹尼亚克和罗·韦恩(Ron Wayne)等人于1976年4月1日创立,并命名为美国苹果电脑公司(Apple Computer Inc. ),2007年1月9日更名为苹果公司,总部位于加利福尼亚州的...'
    },
    {
        id:5,
        frontName: `sumsung`,
        name: `三星`,
        src: sumsung,
        story:'三星集团（英文：SAMSUNG、韩文：삼성）是韩国最大的跨国企业集团，三星集团包括众多的国际下属企业，旗下子公司有：三星电子、三星物产、三星人寿保险等，业务涉及电子、金融、机械、化学等众多领域。'
    },
    {
        id :6,
        frontName: `huawei`,
        name: `华为`,
        src: huawei,
        story:'荣耀品牌成立于2013年,是华为旗下手机双品牌之一。荣耀以“创新、品质、服务”为核心战略,为全球年轻人提供潮酷的全场景智能化体验,打造年轻人向往的先锋文化和潮流生活方式。'
    },
    {
        id:7,
        frontName: `vanward`,
        name: `万和`,
        src: vanward,
        story:'万和成立于1993年8月，总部位于广东顺德国家级高新技术开发区内，是国内生产规模最大的燃气具专业制造企业，也是中国燃气具发展战略的首倡者和推动者、中国五金制品协会燃气用具分会第三届理事长单位。'
    },
    {
        id:8,
        frontName: `fotile`,
        name: `方太`,
        src: fotile,
        story:'Fotile\'s 的故事。'
    },
    {
        id:9,
        frontName: `gree`,
        name: `格力`,
        src: gree,
        story:'Gree\'s 的故事。'
    },
    {
        id :10,
        frontName: `septwolves`,
        name: `七匹狼`,
        src: septwolves,
        story:'BOOB的故事。'
    },
    {
        id :11,
        frontName: `nike`,
        name: `nike`,
        src: nike,
        story:'NIKE的故事。'
    },
];
class BrandService {
    brandList = [];

    constructor() {
        this._getData();
    }

    getBrandList() {
        return this.brandList.concat();
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

        this.brandList = defaultBrandList;
        this._setData();

    }

    _setData() {
        localStorage.setItem('brandList', JSON.stringify(this.brandList));
    }
}

export default BrandService;