import React from "react";
import { withRouter } from "react-router-dom";

class RentalHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: { keyword: "", district: "", type: "" },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      search: Object.assign({}, this.state.search, {
        [name]: target.value,
      }),
    });
  }

  handleSubmit(event) {
    const { search, rentalData } = this.props;
    let result = [];

    rentalData.forEach((item) => {
      let district =
        item.district === this.state.search.district ||
        this.state.search.district === "";
      let type =
        item.type.includes(this.state.search.type) ||
        this.state.search.type === "";
      if (district && type) result.push(item);
    });

    let i;
    switch (this.state.search.district) {
      case "中正區":
        i = 0;
        break;
      case "大同區":
        i = 1;
        break;
      case "中山區":
        i = 2;
        break;
      case "松山區":
        i = 3;
        break;
      case "大安區":
        i = 4;
        break;
      case "萬華區":
        i = 5;
        break;
      case "信義區":
        i = 6;
        break;
      case "士林區":
        i = 7;
        break;
      case "北投區":
        i = 8;
        break;
      case "內湖區":
        i = 9;
        break;
      case "南港區":
        i = 10;
        break;
      case "文山區":
        i = 11;
        break;
      default:
        i = null;
        break;
    }

    let s;
    if (i !== null) {
      let d = search.district;
      d.forEach((item)=>item.selected=false)
      d[i].selected = true;
      s = Object.assign({}, search, {
        district: d,
      });
    } else {
      let d = search.district;
      d.forEach((item)=>item.selected=true)
      s = Object.assign({}, search, {
        district: d,
      });
    }

    this.props.setRentalResult(result, s);
    event.preventDefault();
    this.props.history.push("/rentallist");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            name="keyword"
            placeholder="輸入場地名稱、類型"
            value={this.state.search.keyword}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          <select
            name="district"
            value={this.state.search.district}
            onChange={this.handleInputChange}
          >
            <option value="">行政區</option>
            <option value="中正區">中正區</option>
            <option value="大同區">大同區</option>
            <option value="中山區">中山區</option>
            <option value="松山區">松山區</option>
            <option value="大安區">大安區</option>
            <option value="萬華區">萬華區</option>
            <option value="信義區">信義區</option>
            <option value="士林區">士林區</option>
            <option value="北投區">北投區</option>
            <option value="內湖區">內湖區</option>
            <option value="南港區">南港區</option>
            <option value="文山區">文山區</option>
          </select>
        </label>
        <label>
          <select
            name="type"
            value={this.state.search.type}
            onChange={this.handleInputChange}
          >
            <option value="">場地類型</option>
            <option value="0">運動</option>
            <option value="1">公園</option>
            <option value="2">廣場</option>
            <option value="3">演講廳</option>
            <option value="4">禮堂</option>
            <option value="5">教室</option>
          </select>
        </label>
        <input type="submit" value="搜尋" />
      </form>
    );
  }
}

export default withRouter(RentalHome);
