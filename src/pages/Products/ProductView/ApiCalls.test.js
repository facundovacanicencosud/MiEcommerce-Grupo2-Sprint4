import { render } from "@testing-library/react"
import { deleteProduct } from "../../../utils/apiConfig"


describe('Delete method', () => {
    it('should delete product when api responds', async () => {
        render(<deleteProduct />)
    })
})