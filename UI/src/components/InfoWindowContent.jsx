const InfoWindowContent = ({ position, binaAdi, hasarMiktari }) => (
  <div className=" w-32">
    <div>{"Bina adı:" + binaAdi}</div>
    <div>{"Hasar miktarı:" + hasarMiktari}</div>
    <div>
      {"lat:" + position.lat}, {"lng:" + position.lng}
    </div>
  </div>
)
export default InfoWindowContent
