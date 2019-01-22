const { defaultReqDesc } = require('../helpers/defaults')
const makeDefaultRoute = require('../helpers/makeDefaultRoute')

module.exports = function makeRoutesFromController(controller, config, router) {
    
    const keyValue = Object.entries(config)

    for (let i = 0; i < keyValue.length; i++) {
        let [k,v] = keyValue[i]
        let options = {
            method: 'POST',
            route: `/${k}`,
            reqDesc: defaultReqDesc
        }
        if (v instanceof Object) {
            let tempRoute = options.route
            const { route, ...rest } = v
            console.log("USERINFO PASSES THROUGH THIS ROUTE", route)
            if (route) tempRoute = `/${k}${route}`
            options = { ...options, ...rest, route: tempRoute }
            console.log ("THIS IS THE ROUTE USERINFO HAS", tempRoute)
            //alternatives(`/${k}${addOnRoute}`, makeDefaultRoute(controller[k])(reqDesc))
        } else {
            options.method = v
        }
        let functionParams = [options.route, makeDefaultRoute(controller[k])(options.reqDesc)]
        console.log("adding route", k, v, functionParams[0])
        if (options.method === 'POST') router.post(...functionParams)
        else if (options.method === 'GET') router.get(...functionParams)
        else if (options.method === 'DELETE') router.delete(...functionParams)
    }

    return router
}