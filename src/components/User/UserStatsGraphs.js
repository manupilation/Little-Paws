import React, { useEffect, useState } from 'react';
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import { Link } from 'react-router-dom';

const UserStatsGraphs = ({data}) => {
  const [graph, setGraph] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(data.length) {
      const graphData = data.map((item) => {
        return {
          x: item.title,
          y: Number(item.acessos)
        }
      });
  
      setTotal(
        data.map(({acessos}) => Number(acessos))
          .reduce((prev, next) => prev + next));
  
      setGraph(graphData);
    }
  }, [data]);

  if(data.length)
  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{top: 20, bottom: 20, left: 80, right: 80}}
          style={{
            data: {
              fillOpacity: .9,
              stroke: "#FFF",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            }
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment='start' data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
  else return <div className={styles.noContent}>
    <p>Você ainda não compartilhou nada! 😿</p>
    <div>
      Clique <Link to="/conta/postar">aqui</Link> e compartilhe com a gente!
    </div>
  </div>
};

export default UserStatsGraphs;