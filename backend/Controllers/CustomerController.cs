using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;


namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
    public CustomerContext db = new CustomerContext();
    

    private static int count = 0;
    private readonly ILogger<CustomerController> _logger;

    public CustomerController(ILogger<CustomerController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public ActionResult PostCreateCustomer(Customer customer){
        Console.WriteLine("Inserting a new Customer");
        Console.WriteLine(customer);
        var newCustomer = new Customer
        {
            // id = count++,
            fname = customer.fname,
            lname = customer.lname,
            favoriteColor = customer.favoriteColor,
            email = customer.email,
            phone = customer.phone,
            deleted = false
        };
        DateTime temp = DateTime.Parse(customer.dateOfBirth);
        newCustomer.dateOfBirth = temp.ToString("MM/dd/yyyy");
        newCustomer.currentAge = DateTime.Now.Year -temp.Year;
        db.Add(newCustomer);
        Console.WriteLine("Saving Database");
        db.SaveChanges();
        //Console.WriteLine("Added a Customer! There are now " + db.customers.Count);

        return Ok(newCustomer);
    }

    [HttpGet]
    public ActionResult GetAllCustomers(){
        Console.WriteLine("Getting all Customers");
        //Console.WriteLine(customers.Count + " customers found");
        
        return Ok(db.customers.Where(b => b.deleted == false).ToList());
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCustomer(int id){
        //var customer = db.cust.Find(c => c.id == id);
        var customer = db.customers.Find(id);
        if(customer == null)
            return NotFound();
        Console.WriteLine("Removing Customer with id: " + id);
        customer.deleted = true;
        // db.Remove(customer);
        Console.WriteLine("Saving Database");
        db.SaveChanges();
        return Ok();
    }
}
