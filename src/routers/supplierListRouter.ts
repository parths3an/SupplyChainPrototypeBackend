import { Router, Request, Response, NextFunction} from 'express';
import SupplierList from '../models/supplierListModel';

class SupplierListRouter
{
router: Router;
constructor()
{
	this.router = Router();
	this.routes();
}
public getSuppliers(req:Request, res: Response): void
{
	SupplierList.find({},function(err,data)
	{ 
	if(err) throw err;
				res.json(data);
	});
}

public AddSupplier(req:Request, res: Response): void
{

    const name: string = req.body.name;
    const price: string = req.body.price;
    const date: string = req.body.date;
    
    if (!name || !price || !date) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    const supplierList = new SupplierList({
      name,
      price,
      date,
    });

    supplierList.save()
    .then((supplierList) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        supplierList
      });
    })
    .catch((error) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })
  }


// update supplier by id
  public UpdateSupplier(req: Request, res: Response, next: NextFunction): void {
    const supplierId: string = req.params.supplierId;
 

    SupplierList.findByIdAndUpdate(supplierId, {$set: req.body},function(err,data)
    {
      if(err) throw err;
    
      res.json(req.body); 
    });

  }
	
	public DeleteSupplier(req:Request, res: Response): void
{
const supplierId: string = req.params.supplierId;
SupplierList.findByIdAndRemove(supplierId,function(err,data)
    {
      if(err) throw err;
    
      res.json(req.body); 
    });

  }

//Connnect URIs to the specific function
routes()
{
this.router.get('/', this.getSuppliers);
this.router.post('/',this.AddSupplier);
this.router.put('/:supplierId',this.UpdateSupplier);
this.router.delete('/:supplierId',this.DeleteSupplier);

}
}
//export 
const supplierListRoutes = new SupplierListRouter();
supplierListRoutes.routes();

export default supplierListRoutes.router;