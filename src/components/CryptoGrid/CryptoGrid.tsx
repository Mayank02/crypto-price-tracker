import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import styles from "./CryptoGrid.module.css";
import { Crypto } from "../../store/Context";
import FilterAction from "./FilterAction";

const colDefs: ColDef<Crypto>[] = [
  {
    field: "display_name",
    headerName: "Name",
    filter: true,
    cellClass: styles.cellTextLeft,
  },
  { field: "price", filter: true, cellClass: styles.cellTextLeft },
  { field: "volume", filter: true, cellClass: styles.cellTextLeft },
  {
    field: "favorite",
    filter: true,
    cellClass: styles.cellTextCenter,
    cellRenderer: "favoriteCellRenderer",
  },
];

const defaultColDef: ColDef = {
  flex: 1,
};

interface CryptoGridProps {
  cryptos: Crypto[];
  markCryptoAsFavorite: (id: string) => void;
  isLoaded: boolean;
  lastUpdated: string;
  setFilter: (filter: string) => void;
  filter: string;
}

const FavoriteCellRenderer = (props: any) => {
  const toggleFavorite = () => {
    props.context.markCryptoAsFavorite(props.data.id);
  };

  return (
    <span
      onClick={toggleFavorite}
      className={props.value ? styles.starFilled : styles.starEmpty}
    >
      {props.value ? "★" : "☆"}
    </span>
  );
};

export const CryptoGrid = (props: CryptoGridProps) => {
  return (
    <section>
      <div className={styles.filterContainer}>
        {props.lastUpdated ? (
          <FilterAction filter={props.filter} setFilter={props.setFilter} />
        ) : null}
        {props.lastUpdated && (
          <div className={styles.lastUpdated}>
            <strong>Last Updated: </strong>
            {props.lastUpdated}
          </div>
        )}
      </div>

      <div className={"ag-theme-quartz"} style={{ margin: "0 auto" }}>
        {props.cryptos?.length ? (
          <AgGridReact
            rowData={props.cryptos}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            components={{ favoriteCellRenderer: FavoriteCellRenderer }}
            domLayout="autoHeight"
            rowHeight={40}
            headerHeight={40}
            pagination={true}
            paginationPageSize={10}
            context={{ markCryptoAsFavorite: props.markCryptoAsFavorite }}
          />
        ) : props.isLoaded ? (
          "No data found"
        ) : (
          "Loading..."
        )}
      </div>
    </section>
  );
};

export default CryptoGrid;
