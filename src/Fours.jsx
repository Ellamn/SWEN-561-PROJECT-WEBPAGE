import { useState, useEffect } from 'react'

const DEFAULT_FOURS = [
  {
    weekNumber: 5,
    vision:'To complete the last few documentation pieces of Sprint 0, as defined in Jira',
    metrics:'Work hours per team member, Jira completed task items',
    risk:'Worker availability, Demo validation - demo reveals issues with implementation',
    plan:'All team members complete their tasks in Jira, Items are verified by Dr. Rantanen'
  },
  {
    weekNumber: 6,
    vision:'Begin Sprint 1 development by implementing demo features identified in Sprint 0, establishing a working foundation for the application',
    metrics:'Number of Jira tickets moved to Done, work hours logged per member, feature branches established',
    risk:'Uneven task distribution across team members, scope creep from product owner feedback introducing unplanned work mid-sprint',
    plan:'assign tickets evenly, check in with product owner early in the week to surface feedback before it impacts sprint scope'
  },
  {
    weekNumber: 7,
    vision:'Continue Sprint 1 development with focus on completing in-progress features and addressing feedback received from review',
    metrics:'Jira sprint burndown rate, number of advisor feedback items resolved, work hours per member',
    risk:'team members have reduced availability due to school responsibilities, feedback may require rework of already-completed components',
    plan:'redistribute tickets from members with conflicts, prioritize advisor-requested changes early in the week to avoid end-of-sprint crunch'
  },
  {
    weekNumber: 8,
    vision:'Continue Sprint 1 by finalizing all remaining tickets, updating documentation to reflect completed work, ',
    metrics:'Sprint 1 completion percentage in Jira, documentation pages updated',
    risk:'Incomplete tickets carrying over into Sprint 2, documentation falling behind actual implementation state',
    plan:'Freeze new feature work by midweek to allow time for documentation and testing, conduct internal demo before advisor review to catch issues early'
  },
  {
    weekNumber: 9,
    vision:'preparing a sprint review for the advisor, ensuring the team has a shared understanding of goals and updated Jira backlog',
    metrics:'Sprint 2 backlog created, retrospective action items documented, work hours per member',
    risk:'Carryover tasks from Sprint 1 competing with new Sprint 2 priorities, team motivation dip following a heavy midterms and spring break',
    plan:'Run sprint retrospective at start of next week to surface blockers and wins, finalize Sprint 2 ticket assignments with input from all members before development begins'
  },
  {
    weekNumber: 10,
    vision:'Meeting with the sponsor for the first time in a while, catch them up on everything that we\'ve made progress on and align on goals going forward',
    metrics:'Sprint 2 progress in jira and work hours per tea mmember',
    risk:'Carryover tasks from Sprint 1 competing with new Sprint 2 priorities, team motivation dip following a heavy midterms and spring break',
    plan:'Run sprint retrospective at start of next week to surface blockers and wins, finalize Sprint 2 ticket assignments with input from all members before development begins'
  },
  {
    weekNumber: 11,
    vision:'preparing the video for presentation to other senior project groups',
    metrics:'A completed presentation of why our project matters',
    risk:'None of the team has experience in video production, we might be overfocusing on the video and neglecting regular progress',
    plan:'Put together a script and record during team meeting on Wednesday'
  },
]

//bump this when DEFAULT_FOURS makes a change
const DATA_VERSION = 'v3'

const FIELDS = [
  { key:'vision', label:'Vision / Objective' },
  { key:'metrics', label:'Validation Metrics' },
  { key:'risk', label:'Risks' },
  { key:'plan', label:'Action Plan' },
]

export default function Fours() {
  const [fours, setFours] = useState(() => {
    try {
      // const savedVersion = localStorage.getItem('phantom_fours_version')
      // const saved = localStorage.getItem('phantom_fours_data')
      // if (saved && savedVersion === DATA_VERSION) return JSON.parse(saved)
      return DEFAULT_FOURS
    } catch { return DEFAULT_FOURS }
  })
  const [editIndex, setEditIndex] = useState(null)
  const [draft, setDraft] = useState(null)
  const [adding, setAdding] = useState(false)
  const [newWeek, setNewWeek] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('phantom_fours_data', JSON.stringify(fours))
      localStorage.setItem('phantom_fours_version', DATA_VERSION)
    } catch {}
  }, [fours])

  const startEdit = (i) => {
    setEditIndex(i)
    setDraft({ ...fours[i] })
  }

  const saveEdit = () => {
    setFours(prev => prev.map((f, i) => i === editIndex ? draft : f))
    setEditIndex(null)
    setDraft(null)
  }

  const cancelEdit = () => { setEditIndex(null); setDraft(null) }

  const startAdd = () => {
    setAdding(true)
    setNewWeek('')
    setDraft({ vision: '', metrics: '', risk: '', plan: '' })
  }

  const saveAdd = () => {
    if (!newWeek) return
    const entry = { weekNumber: Number(newWeek), ...draft }
    setFours(prev => [...prev, entry].sort((a, b) => a.weekNumber - b.weekNumber))
    setAdding(false)
    setDraft(null)
  }

  const cancelAdd = () => { setAdding(false); setDraft(null) }

  const deleteEntry = (i) => {
    if (window.confirm('Delete this 4-up?')) {
      setFours(prev => prev.filter((_, idx) => idx !== i))
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Four-Ups</h2>
        <button className="toggle-btn" onClick={startAdd}>+ Add Week</button>
      </div>

      {adding && (
        <div className="four-card editing">
          <div className="four-card-header">
            <span className="four-week-label">
              New Entry — Week&nbsp;
              <input
                type="number"
                className="week-num-input"
                value={newWeek}
                onChange={e => setNewWeek(e.target.value)}
                placeholder="?"
              />
            </span>
            <div className="card-actions">
              <button className="btn-save" onClick={saveAdd}>Save</button>
              <button className="btn-cancel" onClick={cancelAdd}>Cancel</button>
            </div>
          </div>
          <div className="four-grid">
            {FIELDS.map(f => (
              <div key={f.key} className="four-cell">
                <div className="four-cell-label">{f.label}</div>
                <textarea
                  className="four-textarea"
                  value={draft[f.key]}
                  onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))}
                  placeholder={`Enter ${f.label.toLowerCase()}…`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {fours.map((w, i) => (
        <div key={w.weekNumber} className={`four-card ${editIndex === i ? 'editing' : ''}`}>
          <div className="four-card-header">
            <span className="four-week-label">Week {w.weekNumber}</span>
            <div className="card-actions">
              {editIndex === i ? (
                <>
                  <button className="btn-save" onClick={saveEdit}>Save</button>
                  <button className="btn-cancel" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn-edit" onClick={() => startEdit(i)}>✎ Edit</button>
                  <button className="btn-delete" onClick={() => deleteEntry(i)}>✕</button>
                </>
              )}
            </div>
          </div>
          <div className="four-grid">
            {FIELDS.map(f => (
              <div key={f.key} className="four-cell">
                <div className="four-cell-label">{f.label}</div>
                {editIndex === i ? (
                  <textarea
                    className="four-textarea"
                    value={draft[f.key]}
                    onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))}
                  />
                ) : (
                  <p className="four-cell-text">{w[f.key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}