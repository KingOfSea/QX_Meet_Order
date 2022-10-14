const meet_ck = "test"
const meet_date = "20221010"
$prefs.setValueForKey(meet_ck, 'meet_ck')
$prefs.setValueForKey(meet_date, 'meet_date')
// $.info(`meet_ck = ${meet_ck}`)
// $.info(`meet_date = ${meet_date}`)

var name = $prefs.valueForKey('meet_ck')
$.info(`meetkey = ${name}`)

$.done();