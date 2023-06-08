using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
    private static List<Customer> customers = new List<Customer>();
    private readonly ILogger<CustomerController> _logger;

    public CustomerController(ILogger<CustomerController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "PostCreateCustomer")]
    public ActionResult PostCreateCustomer(Customer customer){
        Console.WriteLine(customer);
        var newCustomer = new Customer
        {
            fname = customer.fname,
            lname = customer.lname,
            favoriteColor = customer.favoriteColor,
            email = customer.email,
            phone = customer.phone
        };
        DateTime temp = DateTime.Parse(customer.dateOfBirth);
        newCustomer.dateOfBirth = temp.ToString("MM/dd/yyyy");
        newCustomer.currentAge = DateTime.Now.Year -temp.Year;
        customers.Add(newCustomer);
        Console.WriteLine("Added a Customer! There are now " + customers.Count);
        return Ok(newCustomer);
    }

    [HttpGet(Name = "GetAllCustomers")]
    public ActionResult GetAllCustomers(){
        Console.WriteLine(customers.Count + " customers found");
        return Ok(customers);
    }
}
