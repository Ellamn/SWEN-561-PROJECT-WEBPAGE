const WEEK_OBJECTS = [
    {weekNumber: 3, 
        hours: [{name: 'Ash', hours: 5},
                {name: 'Ata', hours: 4}, 
                {name: 'Cole', hours: 4}, 
                {name: 'Ella', hours: 5}, 
                {name: 'Jensen', hours: 4}, 
                {name: 'Zach', hours: 5},
                {name: 'Total', hours: 27}]
    },
    {weekNumber: 4, 
        hours: [{name: 'Ash', hours: 9},
                {name: 'Ata', hours: 8}, 
                {name: 'Cole', hours: 8}, 
                {name: 'Ella', hours: 10}, 
                {name: 'Jensen', hours: 6}, 
                {name: 'Zach', hours: 9},
                {name: 'Total', hours: 50}]
    },
    {weekNumber: 5, 
        hours: [{name: 'Ash', hours: 9},
                {name: 'Ata', hours: 8}, 
                {name: 'Cole', hours: 7}, 
                {name: 'Ella', hours: 10}, 
                {name: 'Jensen', hours: 8}, 
                {name: 'Zach', hours: 8},
                {name: 'Total', hours: 50}]
    }
]

export default function Time() {
    return (
        <div className="timeTablesContainer">
            {WEEK_OBJECTS.map((w) => {
                return(
                    <table key={w.weekNumber} className="timeTable">
                        <caption>Time Sheet for Week {w.weekNumber}</caption>
                        <tbody>
                            <tr className="timeTableRow tableHeader">
                                <th className="timeTableName">Name</th>
                                <th className="timeTableHours">Hours</th>
                            </tr>
                            {w.hours.map((i) => {
                                return (
                                    <tr key={i.name} className="timeTableRow">
                                        <td className="timeTableName">{i.name}</td>
                                        <td className="timeTableHours">{i.hours}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )
            })
            }
        </div>
    )
}