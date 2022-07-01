import { Header } from "../../components/Header";

export function Orders() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 m-12">
        <div className="table w-full rounded bg-white p-4">
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-left text-lg font-medium">Song</div>
              <div className="table-cell text-left text-lg font-medium">Artist</div>
              <div className="table-cell text-left text-lg font-medium">Year</div>
            </div>
          </div>
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
              <div className="table-cell">Malcolm Lockyer</div>
              <div className="table-cell">1961</div>
            </div>
            <div className="table-row">
                  <div className="table-cell">Witchy Woman</div>
                  <div className="table-cell">The Eagles</div>
                  <div className="table-cell">1972</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Shining Star</div>
              <div className="table-cell">Earth, Wind, and Fire</div>
              <div className="table-cell">1975</div>
            </div>
          </div>
        </div>
        {/* <div className="flex-1"/> */}
        
      </main>
    </div>
  );
}
