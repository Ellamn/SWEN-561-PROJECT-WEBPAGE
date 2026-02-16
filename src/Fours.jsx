const WEEK_OBJECTS = [
    {weekNumber: 5, 
        vision: 'To complete the last few documentation pieces of Sprint 0, as defined in Jira',
        metrics: 'Work hours per team member, Jira completed task items',
        risk: 'Worker availability, Demo validation - demo reveals issues with implementation',
        plan: 'All team members complete their tasks in Jira, Items are verified by Dr.Rantanen'
    }
]

export default function Fours() {
    return (
        <div className="timeTablesContainer">
            {WEEK_OBJECTS.map((w) => {
                return(
                    <table key={w.weekNumber} className="fourUpsTable">
                        <caption className="bold">4-up for Week {w.weekNumber}</caption>
                        <tbody>
                            <tr className="fourUpsHeader">
                                <td>Vision/Objective</td>
                                <td>Validation Metrics</td>
                            </tr>
                            <tr>
                                <td>{w.vision}</td>
                                <td>{w.metrics}</td>
                            </tr>
                            <tr className="fourUpsHeader">
                                <td>Risks</td>
                                <td>Action Plan</td>
                            </tr>
                            <tr>
                                <td>{w.risk}</td>
                                <td>{w.plan}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            })
            }
        </div>
    )
}