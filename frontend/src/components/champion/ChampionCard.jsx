
export default function ChampionCard(props) {
    const { champion } = props
    return <div style={{ border: "1px red solid"}}>
        <h2>
        {champion.name}
        </h2>
        <img src={champion.pictureUrl}/>
    </div>
}