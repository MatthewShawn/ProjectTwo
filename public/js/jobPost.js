const Top = Vue.component("Top", {
    template: `
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/logout">
              Logout
            </a>
            <a class="navbar-brand" href="/manager">
            Manager
          </a>
          <a class="navbar-brand" href="/members">
          Member
        </a>
        <a class="navbar-brand" href="/jobPost">
        Jobs
      </a>
          </div>
        </div>
      </nav>
      `,
    data: {},
    methods: {}
});

const jobpost = Vue.component("jobpost", {
    template: `
		<div class="row">
			<div class="col-md-6 offset-md-3">
				<form id="postings">
					<div class="form-group">
						<label for="title">Title:</label>
						<input placeholder="Job Title" type="text" class="form-control" id="title">
						<br />
						<label for="body">Description:</label>
						<textarea placeholder="Description of job" class="form-control" rows="10" id="body"></textarea>
						<div class="form-group">
							<label for="category">Select Employee:</label>
							<select class="custom-select" id="author">
  						</select>
						</div>
						<br />
						<button type="submit" class="btn btn-success submit">Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>

    `,
    data: {},
    methods: {}
});

const Vapp = new Vue({
    el: "#app",
    data: {},
    methods: {}
});