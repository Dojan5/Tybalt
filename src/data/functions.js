const snekfetch = require('snekfetch');
const fs = require('fs');
const config = require(__dirname + '../../../bot-config.json');
const {
    RichEmbed
} = require('discord.js');


var self = module.exports = {
    CheckAPI: function (url, cb) {
        snekfetch.get(url).then(r => {
            if (r.status.statusCode < 200 || r.status.statusCode > 299 || r.ok == false) return console.log(r.statusText);
            try {
                if (r.body['text'] === 'no such id') {
                    cb(false);
                    console.log('Bad API call.');
                } else if (r.body.error === 'not found') {
                    cb(false);
                    console.log('hit error');
                } else if (r.body) {
                    cb(r.body);
                }
            } catch (err) {
                console.error(err.message);
                cb(false);
            }
        });
    },
    //Function that handles time. Unnecessarily long? Perhaps. I'm really no good at JavaScript. Refactor later once I've improved?
    Horologicus: function (arg = 'Default') {

        var objToday = new Date();

        function DayOfWeek() {
            var Weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var DayOfWeek = Weekdays[objToday.getDay()];
            return DayOfWeek;
        }

        function DayOfMonth() {
            var DoMSuffix = function () {
                var a = objToday;
                if (/1/.test(parseInt((a + '').charAt(0)))) return 'th';
                a = parseInt((a + '').charAt(1));
                return 1 == a ? 'st' : 2 == a ? 'nd' : 3 == a ? 'rd' : 'th';
            }();
            var DayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + DoMSuffix : objToday.getDate() + DoMSuffix;
            return DayOfMonth;
        }

        function Month() {
            var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var CurrentMonth = Months[objToday.getMonth()];
            return CurrentMonth;
        }

        function CurrentYear() {
            var CurrentYear = objToday.getFullYear();
            return CurrentYear;
        }

        function CurrentTime() {
            var CurrentHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? '0' + objToday.getHours() : objToday.getHours());
            var CurrentMinute = objToday.getMinutes() < 10 ? '0' + objToday.getMinutes() : objToday.getMinutes();
            var CurrentMeridiem = objToday.getHours() > 12 ? 'PM' : 'AM';
            return `${CurrentHour}:${CurrentMinute}${CurrentMeridiem}`;
        }

        if (arg == 'Date') {
            return `${DayOfWeek()}, ${DayOfMonth()} of ${Month()} ${CurrentYear()}`;
        } else if (arg == 'Time') {
            return `${CurrentTime()}`;
        } else {
            return `${DayOfWeek()}, ${DayOfMonth()} of ${Month()} ${CurrentYear()} ${CurrentTime()}`;
        }
    }
};