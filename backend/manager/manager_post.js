const dao = require('../BD/dao')


//(creation commerce//Formulaire d'Inscription)
// INSERT INTO public.commerce(nom,adresse,courriel,mot_passe)
// VALUES ('metro', '123 Victoria H3W 1P5', 'metro@mail.com','abc123');
const commerceInscription = class CommerceInscription {
    static getData (nom,adresse,courriel,mot_passe) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.commerce(nom,adresse,courriel,mot_passe) VALUES ($1, $2, $3,$4)', [nom,adresse,courriel,mot_passe], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}



const login = class Login {
    static getData (courriel,mot_passe) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.commerce WHERE courriel = $1 AND mot_passe =$2', [courriel,mot_passe], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}
// const commerceInscription = class CommerceInscription {
//     static addData (trackObject) {
//         let pgJsonResult = null
//         const values = [trackObject.playlist_id, trackObject.title, trackObject.uri, trackObject.master_id]

//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('SELECT * FROM playlist WHERE id = $1', [trackObject.playlist_id], (result1) => {
//                 if (result1.rowCount > 0) {
//                     dao.query('INSERT INTO track(playlist_id, title, uri, master_id) VALUES($1, $2, $3, $4)', values, (result2) => {
//                         if (result2.rowCount > 0) {
//                             pgJsonResult = { operation: '200' }
//                         } else {
//                             pgJsonResult = { operation: '505' }
//                         }
//                         resolve(pgJsonResult)
//                         dao.disconnect()
//                     })
//                 } else {
//                     pgJsonResult = { erreur: '409' }
//                     resolve(pgJsonResult)
//                     dao.disconnect()
//                 }
//             })
//         })
//     }
// }

module.exports = {
    commerceInscription,
    login
}