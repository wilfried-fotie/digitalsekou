export function diffDate(one, two) {


    let diffY = 1
    let diffM = 1
    let diffD = 1


    if (parseInt(two.toLocaleDateString().split("/")[2], 10) >= parseInt(new Date().toLocaleDateString().split("/")[2], 10)) {

        diffY = parseInt(two.toLocaleDateString().split("/")[2], 10) - parseInt(new Date().toLocaleDateString().split("/")[2], 10)

        if (parseInt(two.toLocaleDateString().split("/")[1], 10) >= new Date().toLocaleDateString().split("/")[1] || parseInt(two.toLocaleDateString().split("/")[2], 10) > new Date().toLocaleDateString().split("/")[2]) {
          
            diffM = parseInt(two.toLocaleDateString().split("/")[1], 10) - new Date().toLocaleDateString().split("/")[1] || parseInt(two.toLocaleDateString().split("/")[2], 10) - new Date().toLocaleDateString().split("/")[2]

            if (parseInt(two.toLocaleDateString().split("/")[0], 10) >= new Date().toLocaleDateString().split("/")[0] || parseInt(two.toLocaleDateString().split("/")[1], 10) > new Date().toLocaleDateString().split("/")[1]) {

                diffD = parseInt(two.toLocaleDateString().split("/")[0], 10) - new Date().toLocaleDateString().split("/")[0] || parseInt(two.toLocaleDateString().split("/")[1], 10) - new Date().toLocaleDateString().split("/")[1]

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