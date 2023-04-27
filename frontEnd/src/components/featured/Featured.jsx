import "./featured.css"

const Featured = () => {
  return (
    <div className="featured">
      <div className="item">
      <img
          src="https://media.istockphoto.com/id/162384767/photo/st-louis-cityscape-and-arch.jpg?b=1&s=170667a&w=0&k=20&c=-rLIzktbGy28fT6geoWBZwcTLCimU4pzviu4x32-ODM="
          alt=""
          className="Fimg"
        />
        <div className="featuredTitle">
          <h1>St.Louis</h1>
        </div>
      </div>

      <div className="item">
      <img
          src="https://plus.unsplash.com/premium_photo-1669927131902-a64115445f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2Fnb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="Fimg"
        />
        <div className="featuredTitle">
        
          <h1>Chicago</h1>
        </div>
      </div>

      <div className="item">
      <img
          src="https://cf.bstatic.com/xdata/images/city/600x600/976784.jpg?k=717a6a83ea61edb06017bb8c9bd3d36511ec0e1aef59ac94235584d4fd1709cb&o="
          alt=""
          className="Fimg"
        />
        <div className="featuredTitle">
        
          <h1>New York</h1>
        </div>
      </div>
    </div>
  )
}

export default Featured