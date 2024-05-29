using System;

namespace Work.Models
{
    public class WorkId
    {
        public int WorkOrder { get; set; }
        public string Facility { get; set; }
        public string EquipmentId { get; set; }
        public int Priority { get; set; }
        public int TimeComplete { get; set; }
        public DateTime Submission { get; set; }
        public string Technician { get; set;  }
        public string Status { get; set; }
    }
}