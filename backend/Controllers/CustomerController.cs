using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
    private List<Customer> customers = new List<Customer>();
    private readonly ILogger<CustomerController> _logger;

    public CustomerController(ILogger<CustomerController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "PostCreateCustomer")]
    public Customer PostCreateCustomer(Customer customer){
        Console.WriteLine(customer);
        var newCustomer = new Customer
        {
            fname = customer.fname,
            lname = customer.lname,
            favoriteColor = customer.favoriteColor,
            dateOfBirth = customer.dateOfBirth,
            email = customer.email,
            phone = customer.phone
        };
        newCustomer.currentAge = DateTime.Now.Year - customer.dateOfBirth.Year;
        customers.Add(newCustomer);
        return newCustomer;
    }
}
