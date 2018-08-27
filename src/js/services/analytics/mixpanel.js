
import * as common from "../../utils/common"

export default class Mixpanel {
    initService() {
        if (typeof mixpanel !== "undefined") return
        (function (e, a) {
            if (!a.__SV) {
                var b = window; try { var c, l, i, j = b.location, g = j.hash; c = function (a, b) { return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null }; g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search))) } catch (m) { } var k, h; window.mixpanel = a; a._i = []; a.init = function (b, c, f) {
                    function e(b, a) {
                        var c = a.split("."); 2 == c.length && (b = b[c[0]], a = c[1]); b[a] = function () {
                            b.push([a].concat(Array.prototype.slice.call(arguments,
                                0)))
                        }
                    } var d = a; "undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel"; d.people = d.people || []; d.toString = function (b) { var a = "mixpanel"; "mixpanel" !== f && (a += "." + f); b || (a += " (stub)"); return a }; d.people.toString = function () { return d.toString(1) + ".people (stub)" }; k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                    for (h = 0; h < k.length; h++)e(d, k[h]); a._i.push([b, c, f])
                }; a.__SV = 1.2; b = e.createElement("script"); b.type = "text/javascript"; b.async = !0; b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js"; c = e.getElementsByTagName("script")[0]; c.parentNode.insertBefore(b, c)
            }
        })(document, window.mixpanel || []);
        mixpanel.init("9c78999aea94c92497693a5a0c7e6890");


        this.addUserIdentity()


    }
    addUserIdentity() {
        if (typeof mixpanel === "undefined") return;

        var userCookies = common.getCookie("mixpanel_user_cookies")
        if (!userCookies) {
            userCookies = Math.random().toString(36).slice(2)
            common.setCookie("mixpanel_user_cookies", userCookies)
        }

        mixpanel.identify(userCookies);
        mixpanel.people.set_once({
            "$distinct_id": userCookies,
            "$name": userCookies
        });
    }

    acceptTerm(value){
        if (typeof mixpanel !== "undefined" && typeof mixpanel.track === 'function'){
            try{
                mixpanel.track("Widget_Click_AcceptTerm", {value:value})
            }catch(e){
                console.log(e)
            }
        }
    }
    
}