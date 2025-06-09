//品牌介绍
import 三只松鼠 from "./images/三只松鼠.png"
import 卫龙 from "./images/卫龙.png"
import 大疆 from "./images/大疆.png"
import 海尔 from "./images/海尔.png"
import 美的 from "./images/美的.png"
import 舒克 from "./images/舒克.png"
const defaultBrandList = [
    {
        id:1,
        frontName: `三只松鼠`,
        name: `三只松鼠`,
        src: 三只松鼠,
        story:'三只松鼠，是三只松鼠股份有限公司旗下的休闲零食品牌。三只松鼠股份有限公司主要经营坚果和休闲零食，地址位于安徽省芜湖市，现已发展成为累计服务超1.7亿消费者的坚果行业龙头企业及上市公司】，并成功孵化婴童食品品牌“小鹿蓝蓝” 。'
    },
    {
        id:2,
        frontName: `舒克`,
        name: `舒克`,
        src: 舒克,
        story:'舒客致力于洞察东方人口腔特性，专研更适合东方人的口腔美护产品，产品线涵盖牙刷、牙膏、漱口水、牙线棒、声波牙刷和智能冲牙器等全品类口腔护理产品，守护国人口腔健康，绽放东方自信笑。'
    },
    {
        id:3,
        frontName: `卫龙`,
        name: `卫龙`,
        src: 卫龙,
        story:'“卫龙创办于1999年，总部河南省漯河市。历经20余年发展已成为国内集研发、生产和销售为一体的现代化辣味休闲食品企业。'
    },

    {
        id:4,
        frontName: `大疆`,
        name: `大疆`,
        src: 大疆,
        story:'大疆创新是深圳市大疆创新科技有限公司旗下的无人机品牌，创立于2006年。'
    },
    {
        id :5,
        frontName: `海尔`,
        name: `海尔`,
        src: 海尔,
        story:'海尔创立于1984年，是全球领先的美好生活和数字化转型解决方案服务商。 [1-4] [12]在持续创业创新过程中，海尔集团始终坚持“人的价值最大化”为发展主线。'
    },
    {
        id:6,
        frontName: `美的`,
        name: `美的`,
        src: 美的,
        story:'美的集团股份有限公司（MEDI GROUP STOCK LIMITED），简称“美的集团”，是一家以从事通用设备制造业为主的企业，注册成立于2000年4月7日，'
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


    _getData() {

        this.brandList = defaultBrandList;
        this._setData();

    }

    _setData() {
        localStorage.setItem('brandList', JSON.stringify(this.brandList));
    }
}

export default BrandService;
