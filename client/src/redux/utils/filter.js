const filterBySchedule = (emailData) => {
    const dashboard = emailData.filter((item) => item.isSent !== true )

    const history = emailData.filter((item) => item.isSent === true);

    return [...emailData, {dashboard: dashboard, history: history}]
}
