import React from "react";

import Tile from "./Tile";

const Tiles = (props) => {
  const tileList = props.item.tiles.map((tile) => <Tile tile={tile} key={tile.id} create={tile.create}/>);
  return (
    <>
      <div className="section-title-wrapper">
        <h4 className="section-title  text-start" >{props.item.title}</h4>
      </div>
      <div className="master-content-wrapper">{tileList}</div>
    </>
  );
};

export default Tiles;
