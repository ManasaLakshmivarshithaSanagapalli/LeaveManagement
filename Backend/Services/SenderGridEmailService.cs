namespace LeaveManagementAPI.Services
{
    using SendGrid;
    using SendGrid.Helpers.Mail;

    public class SendGridEmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public SendGridEmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            Console.WriteLine("➡ SendEmailAsync called");

            var apiKey = _config["SendGrid:ApiKey"];
            var fromEmail = _config["SendGrid:FromEmail"];
            var fromName = _config["SendGrid:FromName"];

            Console.WriteLine($"➡ API Key is null? {string.IsNullOrEmpty(apiKey)}");
            Console.WriteLine($"➡ FromEmail: {fromEmail}");
            Console.WriteLine($"➡ ToEmail: {toEmail}");

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, fromName);
            var to = new EmailAddress(toEmail);

            //var msg = MailHelper.CreateSingleEmail(from, to, subject, message, message);
            var htmlContent = $@"
    <div style=""font-family: Arial; font-size: 14px;"">
        <p>Hello,</p>
        <p>Please click the button below to reset your password:</p>
        <p>
            <a href=""{message}"" 
               style=""background-color:#16a34a;color:white;padding:10px 15px;
                      text-decoration:none;border-radius:6px;font-weight:bold;"">
                Reset Password
            </a>
        </p>
        <p>If the button does not work, copy and paste this link in your browser:</p>
        <p>{message}</p>
    </div>
";
            var msg = MailHelper.CreateSingleEmail( from,to, subject,"Please reset your password using the link provided.",
    $"Please click the link below to reset your password:< a href =\"{message}\" style=\"color: blue; font-size: 16px;\">Reset Password</a>"
);


            var response = await client.SendEmailAsync(msg);

            Console.WriteLine($"➡ SendGrid Status: {response.StatusCode}");
            var body = await response.Body.ReadAsStringAsync();
            Console.WriteLine($"➡ SendGrid Body: {body}");

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(
                    $"SendGrid email failed: {response.StatusCode}\nFull body: {body}"
                );
            }
        }
    }
}
