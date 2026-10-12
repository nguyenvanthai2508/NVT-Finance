
import { useState } from 'react'

const stocks = [
  { code: 'FPT', name: 'FPT Corporation', price: 125.4, change: 2.35, pe: 22.5, roe: 25.1 },
  { code: 'HPG', name: 'Hòa Phát', price: 28.6, change: 1.42, pe: 13.8, roe: 14.2 },
  { code: 'VCB', name: 'Vietcombank', price: 91.2, change: -0.65, pe: 15.7, roe: 19.6 },
  { code: 'SSI', name: 'Chứng khoán SSI', price: 34.8, change: 3.15, pe: 17.4, roe: 12.8 },
  { code: 'MWG', name: 'Thế Giới Di Động', price: 65.1, change: 1.75, pe: 20.4, roe: 17.3 },
]

const chart = [32, 43, 38, 55, 49, 67, 60, 74, 65, 79, 72, 88]
const money = value => value.toLocaleString('vi-VN')

function App() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('FPT')
  const [page, setPage] = useState('Tổng quan')
  const stock = stocks.find(s => s.code === selected)

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #080f1e; color: #eaf0fa; font-family: Inter, Arial, sans-serif; }
        #root { width: 100%; min-height: 100vh; }
        button, input { font: inherit; }
        button { cursor: pointer; }
        .shell { display: flex; min-height: 100vh; }
        aside { width: 245px; background: #0c1628; border-right: 1px solid #233148; padding: 28px 17px; flex-shrink: 0; }
        .logo { font-size: 29px; font-weight: 900; color: #f5f8ff; letter-spacing: -1px; padding: 0 12px 32px; }
        .logo span { color: #37d7ad; }
        .nav { display: block; width: 100%; text-align: left; border: 0; background: transparent; color: #9caec8; padding: 15px; margin: 5px 0; border-radius: 10px; }
        .nav.active, .nav:hover { color: #46e6bc; background: #153342; }
        .side-note { font-size: 12px; color: #7b8ba5; padding: 22px 12px; line-height: 1.7; }
        main { padding: 30px; max-width: 1450px; width: 100%; margin: auto; }
        header { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 28px; }
        h1 { font-size: 27px; margin: 0 0 7px; }
        h2 { font-size: 17px; margin: 0 0 22px; }
        p { color: #91a5c2; margin: 0; }
        input { background: #142239; color: white; border: 1px solid #30415b; padding: 13px 17px; border-radius: 10px; outline: none; min-width: 230px; }
        .notice { background: #142239; padding: 12px 16px; border-radius: 10px; font-size: 12px; color: #c1cfe0; margin-bottom: 24px; }
        .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .card { background: #111e32; border: 1px solid #263650; border-radius: 15px; padding: 22px; }
        .label { color: #95a8c3; font-size: 13px; }
        .value { font-size: 27px; font-weight: 750; margin: 14px 0 8px; }
        .up { color: #43ddb0; }
        .down { color: #ff748b; }
        .content { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 24px; }
        .chart { width: 100%; height: 230px; margin-top: 12px; }
        .barset { display: flex; align-items: end; justify-content: space-around; gap: 10px; height: 190px; border-bottom: 1px solid #34425b; }
        .bar { flex: 1; max-width: 33px; background: linear-gradient(#41dfb4, #196c78); border-radius: 5px 5px 0 0; }
        .months { display: flex; justify-content: space-around; font-size: 11px; color: #8094b2; margin-top: 10px; }
        .detail { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .detail div { padding: 13px; background: #192b42; border-radius: 9px; }
        .detail strong { display: block; margin-top: 9px; font-size: 19px; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { color: #8b9fbb; font-size: 12px; font-weight: 500; }
        td, th { padding: 15px 10px; border-bottom: 1px solid #27364c; }
        td { font-size: 14px; }
        tbody tr { cursor: pointer; }
        tbody tr:hover, tbody tr.selected { background: #1b3542; }
        .sub { display: block; color: #8497ae; font-size: 11px; margin-top: 5px; }
        .pill { background: #143d38; padding: 6px 10px; border-radius: 7px; font-weight: 700; }
        footer { padding: 25px 0; color: #7388a5; font-size: 12px; text-align: center; }
        @media(max-width: 950px) { aside { width: 190px; } .metrics { grid-template-columns: repeat(2, 1fr); } .content { grid-template-columns: 1fr; } }
        @media(max-width: 650px) { .shell { display: block; } aside { width: 100%; padding: 12px; } .logo { padding: 8px; } .nav { display: inline-block; width: auto; padding: 10px; } main { padding: 16px; } header { display: block; } input { width: 100%; margin-top: 18px; } .metrics { gap: 9px; } .card { padding: 15px; } .value { font-size: 21px; } .table-wrap { overflow-x: auto; } }
      `}</style>

      <div className="shell">
        <aside>
          <div className="logo">NVT<span>.COM</span></div>
          {['Tổng quan', 'Phân tích cổ phiếu', 'Định giá doanh nghiệp', 'Danh mục đầu tư'].map(item => (
            <button key={item} className={'nav ' + (page === item ? 'active' : '')} onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
          <div className="side-note">
            NVT Financial Analytics
            <br />Nghiên cứu tài chính Việt Nam
            <br />Phiên bản thử nghiệm 1.0
          </div>
        </aside>

        <main>
          <header>
            <div>
              <h1>{page}</h1>
              <p>NVT.COM | Financial Analytics Platform</p>
            </div>
            <input placeholder="Tìm mã cổ phiếu..." value={search} onChange={e => setSearch(e.target.value.toUpperCase())} />
          </header>

          <div className="notice">
            DỮ LIỆU MINH HỌA — Không phải thông tin thị trường thực tế hoặc khuyến nghị đầu tư.
          </div>

          <div className="metrics">
            {[
              ['VN-INDEX', '1.285,45', '+1,24%'],
              ['VN30', '1.342,68', '+0,85%'],
              ['HNX-INDEX', '231,50', '-0,32%'],
              ['UPCOM', '98,24', '+0,45%']
            ].map(([label, value, change]) => (
              <div className="card" key={label}>
                <div className="label">{label}</div>
                <div className="value">{value}</div>
                <div className={change.startsWith('-') ? 'down' : 'up'}>{change}</div>
              </div>
            ))}
          </div>

          <div className="content">
            <section className="card">
              <h2>Biểu đồ xu hướng thị trường</h2>
              <p>Mô phỏng biến động trong 12 tháng</p>
              <div className="chart">
                <div className="barset">
                  {chart.map((n, i) => <div key={i} className="bar" style={{ height: n + '%' }} title={'Tháng ' + (i + 1)} />)}
                </div>
                <div className="months">{chart.map((_, i) => <span key={i}>{i + 1}</span>)}</div>
              </div>
            </section>

            <section className="card">
              <h2>Phân tích {stock.code}</h2>
              <p>{stock.name}</p>
              <div className="value">{money(stock.price)} nghìn đ</div>
              <p className={stock.change < 0 ? 'down' : 'up'}>
                {stock.change > 0 ? '+' : ''}{stock.change}%
              </p>
              <div className="detail" style={{ marginTop: 23 }}>
                <div><span className="label">P/E</span><strong>{stock.pe}</strong></div>
                <div><span className="label">ROE</span><strong>{stock.roe}%</strong></div>
                <div><span className="label">Mã cổ phiếu</span><strong>{stock.code}</strong></div>
                <div><span className="label">Thị trường</span><strong>Việt Nam</strong></div>
              </div>
            </section>
          </div>

          <section className="card">
            <h2>Danh sách cổ phiếu theo dõi</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Mã</th><th>Giá (nghìn đ)</th><th>Thay đổi</th><th>P/E</th><th>ROE</th></tr>
                </thead>
                <tbody>
                  {stocks.filter(s => (s.code + s.name).toUpperCase().includes(search)).map(s => (
                    <tr key={s.code} className={selected === s.code ? 'selected' : ''} onClick={() => setSelected(s.code)}>
                      <td><span className="pill">{s.code}</span><span className="sub">{s.name}</span></td>
                      <td>{money(s.price)}</td>
                      <td className={s.change < 0 ? 'down' : 'up'}>{s.change > 0 ? '+' : ''}{s.change}%</td>
                      <td>{s.pe}</td>
                      <td>{s.roe}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <footer>© 2026 NVT.COM · Financial Analytics · Dữ liệu thử nghiệm</footer>
        </main>
      </div>
    </>
  )
}

export default App
