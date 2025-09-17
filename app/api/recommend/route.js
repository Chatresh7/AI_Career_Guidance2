export async function POST(req) {
  try {
    const body = await req.json()

    // Very small mock logic - in real app you'd call OpenAI or your rules engine
    const {domain, awareness, category, skills, goals, dailyHours} = body || {}
    const base = {
      domain: domain || 'general',
      awareness: awareness || 'not_aware',
      suggested: []
    }

    if(awareness === 'not_aware'){
      base.suggested = [
        {title: 'Intro to ' + base.domain, durationWeeks: 2},
        {title: 'Basic concepts & terminology', durationWeeks: 2},
        {title: 'Foundational project', durationWeeks: 2},
      ]
    } else {
      if(category === 'resume_projects'){
        base.suggested = [
          {title: 'Resume polish & project showcase', durationWeeks: 2},
          {title: 'Advanced project: Build capstone', durationWeeks: 4},
          {title: 'Apply to internships', durationWeeks: 2},
        ]
      } else {
        base.suggested = [
          {title: 'Refresher course', durationWeeks: 2},
          {title: 'Skill gap mini-projects', durationWeeks: 3},
          {title: 'Interview prep', durationWeeks: 1},
        ]
      }
    }

    base.estimatedHoursPerWeek = (dailyHours || 1) * 7
    base.matchPercent = Math.min(95, 50 + (skills ? skills.split(',').length * 8 : 0))

    return new Response(JSON.stringify(base), {status: 200, headers: {'content-type':'application/json'}})
  } catch (err) {
    return new Response(JSON.stringify({error: String(err)}), {status:500, headers:{'content-type':'application/json'}})
  }
}
