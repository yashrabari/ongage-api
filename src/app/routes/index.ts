import { Router } from 'express'
import apis from './apis'


const app = Router()




app.use('/api', apis)






export default app