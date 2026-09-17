using Microsoft.AspNetCore.Mvc;
using CodeBackend.Models;
using CodeBackend.Services;

namespace CodeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Uc10Controller : ControllerBase
    {
        private readonly IUc10Service _uc10Service;

        public Uc10Controller(IUc10Service uc10Service)
        {
            _uc10Service = uc10Service;
        }

        [HttpGet("student/{id}")]
        public ActionResult<Student> GetInternDossier(int id)
        {
            var student = _uc10Service.GetInternDossier(id);
            if (student == null) return NotFound(new { message = "Không tìm thấy sinh viên" });
            return Ok(student);
        }

        [HttpPost("evaluate")]
        public ActionResult<Uc10EvaluationResponse> SubmitEnterpriseEvaluation([FromBody] Uc10EvaluationRequest request)
        {
            var result = _uc10Service.SubmitEnterpriseEvaluation(request);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
