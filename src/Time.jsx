import { useState, useEffect } from 'react'

const MEMBERS = ['Ash', 'Ata', 'Cole', 'Ella', 'Jensen', 'Zach']
//should be weeks 3-28 
const WEEKS = Array.from({ length: 26 }, (_, i) => i + 3)

//bump this whenever DEFAULT_DATA is edited in here
const DATA_VERSION = 'v2' 

// data persistance, too lazy for database lol
const DEFAULT_DATA = {
   3: { actual: { Ash: 5,   Ata: 4,   Cole: 4,   Ella: 5,   Jensen: 4,   Zach: 5  }, estimate: { Ash: 6,  Ata: 4,  Cole: 3,  Ella: 5,  Jensen: 3,  Zach: 6  } },
   4: { actual: { Ash: 9,   Ata: 8,   Cole: 8,   Ella: 10,  Jensen: 6,   Zach: 9  }, estimate: { Ash: 7,  Ata: 8,  Cole: 9,  Ella: 7,  Jensen: 8,  Zach: 7  } },
   5: { actual: { Ash: 9,   Ata: 8,   Cole: 7,   Ella: 10,  Jensen: 8,   Zach: 8  }, estimate: { Ash: 11, Ata: 9,  Cole: 9,  Ella: 15, Jensen: 10, Zach: 10 } },
   6: { actual: { Ash: 9,   Ata: 13,  Cole: 11,  Ella: 15,  Jensen: 13,  Zach: 14 }, estimate: { Ash: 10, Ata: 13, Cole: 10, Ella: 15, Jensen: 12, Zach: 14 } },
   7: { actual: { Ash: 9,   Ata: 9,   Cole: 8,   Ella: 17,  Jensen: 10,  Zach: 12 }, estimate: { Ash: 10, Ata: 11, Cole: 11, Ella: 15, Jensen: 11, Zach: 13 } },
   8: { actual: { Ash: 12,  Ata: 10,  Cole: 9,   Ella: 18,  Jensen: 12,  Zach: 14 }, estimate: { Ash: 10, Ata: 12, Cole: 11, Ella: 20, Jensen: 12, Zach: 15 } },
   9: { actual: { Ash: 10,  Ata: 11,  Cole: 8,   Ella: 15,  Jensen: 10,  Zach: 12 }, estimate: { Ash: 15, Ata: 11, Cole: 10, Ella: 15, Jensen: 12, Zach: 10 } },
  10: { actual: { Ash: 16,  Ata: 13,  Cole: 9,   Ella: 13,  Jensen: 14,  Zach: 15 }, estimate: { Ash: 16, Ata: 14, Cole: 11, Ella: 10, Jensen: 14, Zach: 16 } },
  11: { actual: { Ash: 18,  Ata: 12,  Cole: 10,  Ella: 8,   Jensen: 11,  Zach: 10 }, estimate: { Ash: 18, Ata: 15, Cole: 12, Ella: 10, Jensen: 12, Zach: 10 } },
  12: { actual: { Ash: 15,  Ata: 13,  Cole: 8,   Ella: 10,  Jensen: 8,   Zach: 10 }, estimate: { Ash: 18, Ata: 15, Cole: 13, Ella: 15, Jensen: 14, Zach: 15 } },
  13: { actual: { Ash: 10,  Ata: 12,  Cole: 11,  Ella: 15,  Jensen: 12,  Zach: 12 }, estimate: { Ash: 13, Ata: 13, Cole: 13, Ella: 15, Jensen: 15, Zach: 15 } },
  14: { actual: { Ash: 10,  Ata: 11,  Cole: 7,   Ella: 13,  Jensen: 12,  Zach: 11 }, estimate: { Ash: 10, Ata: 12, Cole: 10, Ella: 10, Jensen: 12, Zach: 11 } },
  15: { actual: { Ash: 8,   Ata: 8,   Cole: 7,   Ella: 8,   Jensen: 10,  Zach: 10 }, estimate: { Ash: 9,  Ata: 8,  Cole: 10, Ella: 15, Jensen: 10, Zach: 10 } },
  17: { actual: { Ash: 8,   Ata: 13,  Cole: 10,  Ella: 8,   Jensen: 12,  Zach: 13 }, estimate: { Ash: 8,  Ata: 11, Cole: 12, Ella: 10, Jensen: 15, Zach: 13 } },
  18: { actual: { Ash: 10,  Ata: 14,  Cole: 13,  Ella: 10,  Jensen: 12,  Zach: 13 }, estimate: { Ash: 20, Ata: 15, Cole: 15, Ella: 15, Jensen: 12, Zach: 14 } },
  19: { actual: { Ash: 8,   Ata: 17,  Cole: 11,  Ella: 15,  Jensen: 14,  Zach: 11 }, estimate: { Ash: 8,  Ata: 16, Cole: 12, Ella: 15, Jensen: 15, Zach: 12 } },
  20: { actual: { Ash: 8,   Ata: 17,  Cole: 8,   Ella: 15,  Jensen: 14,  Zach: 10 }, estimate: { Ash: 8,  Ata: 18, Cole: 10, Ella: 15, Jensen: 12, Zach: 11 } },
  21: { actual: { Ash: 10,  Ata: 16,  Cole: 10,  Ella: 10,  Jensen: 16,  Zach: 11 }, estimate: { Ash: 8,  Ata: 16, Cole: 10, Ella: 10, Jensen: 15, Zach: 12 } },
  22: { actual: { Ash: 10,  Ata: 16,  Cole: 8,   Ella: 20,  Jensen: 18,  Zach: 12 }, estimate: { Ash: 8,  Ata: 15, Cole: 8,  Ella: 12, Jensen: 16, Zach: 13 } },
  23: { actual: { Ash: 10,  Ata: 15,  Cole: 11,  Ella: 15,  Jensen: 16,  Zach: 14 }, estimate: { Ash: 8,  Ata: 11, Cole: 10, Ella: 20, Jensen: 16, Zach: 15 } },
  24: { actual: { Ash: 14,  Ata: 13,  Cole: 12,  Ella: 15,  Jensen: 20,  Zach: 15 }, estimate: { Ash: 10, Ata: 13, Cole: 12, Ella: 15, Jensen: 15, Zach: 16 } },
  25: { actual: { Ash: 14,  Ata: 12,  Cole: 12,  Ella: 30,  Jensen: 17,  Zach: 14 }, estimate: { Ash: 18, Ata: 10, Cole: 10, Ella: 20, Jensen: 18, Zach: 15 } },
  26: { actual: { Ash: 16,  Ata: 12,  Cole: 12,  Ella: 8,   Jensen: 15,  Zach: 16 }, estimate: { Ash: 18, Ata: 12, Cole: 11, Ella: 8,  Jensen: 15, Zach: 14 } },
  27: { actual: { Ash: 14,  Ata: 11,  Cole: 10,  Ella: 0,   Jensen: 12,  Zach: 13 }, estimate: { Ash: 14, Ata: 11, Cole: 8,  Ella: 0,  Jensen: 15, Zach: 16 } },
  28: { actual: { Ash: 0,   Ata: 0,   Cole: 0,   Ella: 0,   Jensen: 0,   Zach: 0  }, estimate: { Ash: 10, Ata: 10, Cole: 8,  Ella: 10, Jensen: 8,  Zach: 0 } },
  29: { actual: { Ash: 0,   Ata: 0,   Cole: 0,   Ella: 0,   Jensen: 0,   Zach: 0  }, estimate: { Ash: 0,  Ata: 0,  Cole: 8,  Ella: 0,  Jensen: 8,  Zach: 0 } },
};

function initData() {
  const d = {}
  for (const w of WEEKS) {
    d[w] = DEFAULT_DATA[w] ?? {
      actual:   Object.fromEntries(MEMBERS.map(m => [m, ''])),
      estimate: Object.fromEntries(MEMBERS.map(m => [m, ''])),
    }
  }
  return d
}

function total(obj) {
  return MEMBERS.reduce((s, m) => s + (Number(obj[m]) || 0), 0)
}

export default function Time() {
  const [data, setData] = useState(() => {
    try {
      // const savedVersion = localStorage.getItem('phantom_time_version')
      // const saved = localStorage.getItem('phantom_time_data')
      // if (saved && savedVersion === DATA_VERSION) return JSON.parse(saved)
      return initData()
    } catch { return initData() }
  })
  const [editMode, setEditMode] = useState(false)
  const [activeWeek, setActiveWeek] = useState(3)

  useEffect(() => {
    try {
      localStorage.setItem('phantom_time_data', JSON.stringify(data))
      localStorage.setItem('phantom_time_version', DATA_VERSION)
    } catch {}
  }, [data])

  const handleChange = (week, type, member, value) => {
    setData(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [type]: { ...prev[week][type], [member]: value === '' ? '' : Number(value) }
      }
    }))
  }

  const weeksWithData = WEEKS.filter(w => total(data[w]?.actual ?? {}) > 0 || total(data[w]?.estimate ?? {}) > 0)
  const displayWeeks = editMode ? WEEKS : weeksWithData

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Time Sheets</h2>
        <button
          className={`toggle-btn ${editMode ? 'active' : ''}`}
          onClick={() => setEditMode(e => !e)}
        >
          {editMode ? '✓ Done Editing' : '✎ Edit Hours'}
        </button>
      </div>

      {editMode && (
        <div className="week-selector">
          {WEEKS.map(w => (
            <button
              key={w}
              className={`week-pill ${activeWeek === w ? 'active' : ''} ${total(data[w]?.actual ?? {}) > 0 ? 'has-data' : ''}`}
              onClick={() => setActiveWeek(w)}
            >
              W{w}
            </button>
          ))}
        </div>
      )}

      <div className="tables-grid">
        {(editMode ? [activeWeek] : displayWeeks).map(w => (
          <div key={w} className="time-card">
            <div className="card-week-label">Week {w}</div>
            <table className="time-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Actual</th>
                  <th>Estimate</th>
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map(m => (
                  <tr key={m}>
                    <td className="member-name">{m}</td>
                    <td>
                      {editMode ? (
                        <input
                          type="number"
                          min="0"
                          className="hour-input"
                          value={data[w]?.actual[m] ?? ''}
                          onChange={e => handleChange(w, 'actual', m, e.target.value)}
                          placeholder="—"
                        />
                      ) : (
                        <span className="hour-val">{data[w]?.actual[m] || '—'}</span>
                      )}
                    </td>
                    <td>
                      {editMode ? (
                        <input
                          type="number"
                          min="0"
                          className="hour-input"
                          value={data[w]?.estimate[m] ?? ''}
                          onChange={e => handleChange(w, 'estimate', m, e.target.value)}
                          placeholder="—"
                        />
                      ) : (
                        <span className="hour-val est">{data[w]?.estimate[m] || '—'}</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>Total</td>
                  <td><span className="hour-val total">{total(data[w]?.actual ?? {})}</span></td>
                  <td><span className="hour-val total est">{total(data[w]?.estimate ?? {})}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}