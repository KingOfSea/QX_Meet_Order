const meet_ck = "test"
const meet_date = "2022-10-10"
$prefs.setValueForKey(meet_ck, 'meet_ck')
$prefs.setValueForKey(meet_date, 'meet_date')
console.log(`meet_ck = ${meet_ck}`)
console.log(`meet_date = ${meet_date}`)
$done();