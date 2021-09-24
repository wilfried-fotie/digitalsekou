export function verifSupDate(one, two) {

   



    if (parseInt(two.toLocaleDateString().split("/")[2], 10) >= parseInt(new Date().toLocaleDateString().split("/")[2], 10)) {
        

        if (parseInt(two.toLocaleDateString().split("/")[1], 10) >= new Date().toLocaleDateString().split("/")[1] || parseInt(two.toLocaleDateString().split("/")[2], 10) > new Date().toLocaleDateString().split("/")[2]) {
            if (parseInt(two.toLocaleDateString().split("/")[0], 10) >= new Date().toLocaleDateString().split("/")[0] || parseInt(two.toLocaleDateString().split("/")[1], 10) > new Date().toLocaleDateString().split("/")[1]) {

                return true

            } else {

                return false

            }
        
       } else {

           return false
       }
        
    } else {

        return false
    }

}