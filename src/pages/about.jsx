import { Container, Divider, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import Menu from "../components/UI/Menu";
import { Helmet } from "react-helmet";

const About = () => {

  return (
    <Grid mt={8} mb={5} container item marginX={1} className="flex">
      
        <Helmet>
            <title>CFBS - About us</title>
            <meta name="title" content="About us" />
            <meta name="details" content="We believe in the power of collective action to create a stronger, more equitable India for all. We welcome your ideas, feedback, and support as we work towards this shared vision" />
        </Helmet>


        <Grid container md={8} item display={"block"}>
        <Container maxWidth="sm">
          <p className={`heading font-900`}>
          Cause For Better Society
          </p>
          <br />
            <Divider/>
          <br />
          <p className="sub-heading font-800">
            About Us :
          </p> <br />
          <p className="medium font-600">
          Cause For Better Society, Together
          </p>
          <br />
          <p className="font-Nota text-justified font-500" style={{fontStyle: "italic"}}>
            We believe in the power of unity, compassion, and action to create a
            more just and equitable India. We are a diverse group of individuals
            driven by a common goal: to make a positive impact on the lives of
            others and contribute to a better future for our nation.
          </p>
          <br />
          <p className="text-justified  font-400">
            Empowering communities: We collaborate with local communities to
            understand their needs and develop sustainable solutions. This could
            involve initiatives like education programs, healthcare access,
            environmental projects, or economic development ventures.
          </p>
          <br />
          <p className="text-justified  font-400">
            Fostering innovation: We encourage and support innovative ideas that
            address social issues. We provide resources, mentorship, and
            networking opportunities to individuals and organizations working on
            impactful projects.
          </p>
          <br />
          <p className="text-justified  font-400">
            Advocating for change: We raise our voices to advocate for policies
            and systems that promote social justice and equality. We engage with
            policymakers, influencers, and the public to create a more inclusive
            and equitable India.
          </p>
          <br />
          <p className="sub-heading font-800">
            Our values are the foundation of everything we do:
          </p>
          <br />
          <p className="text-justified  font-400">
            <span className=" font-600">Collaboration: </span> We believe that working together is essential to
            achieve lasting change. We value the diversity and encourage open communication and collaboration among all.
            We are committed to transparency, accountability, and ethical conduct in all our endeavors.
          </p>
          <br />
          <p className="text-justified  font-400">
          <span className=" font-600">Inclusivity:</span> We believe in the inherent worth and dignity of every
            individual, regardless of their background or circumstances. We
            strive to create a society where everyone feels valued and has the
            opportunity to thrive.
          </p>
          <br />
          <p className="text-justified  font-400">
          <span className=" font-600">Impact: </span>We are driven by a desire to make a real and lasting
            difference in the lives of others. We measure our success by the
            positive impact we create in communities across India.
          </p>
          <br />
          <p className="text-justified  font-500">
            We invite you to join us on this journey. Whether you want to
            volunteer your time, donate your resources, or simply spread the
            word about our work, every contribution is valuable. Together, we
            can build a brighter future for India, one step at a time.
          </p>
          <br />
          <p className="sub-heading font-800">
          Community Feedback and Issue Resolution Guidelines
          </p>
          <br />
          <p className="text-justified  font-400">
          <span className=" font-600">Introduction: </span>
          Welcome to our community feedback and issue resolution platform! We value open communication and aim to provide a seamless experience for users to address concerns, seek assistance, and contribute to the improvement of our platform. To ensure a smooth process, please adhere to the following guidelines.
          </p>
          <br />
          <p className="text-justified">
          <span className=" font-600">1. Posting and Anonymity: </span><br/>
          To create a post, click the "Write" button.
          Users can choose to remain anonymous by selecting the "anonymous" visibility option during post creation.
          Note that once a post is uploaded, you can edit or delete it until someone raises a solution to complete.

          <br/><br/><span className=" font-600">2. Editing and Deletion: </span><br/>
          If no completion solution has been raised, authors can freely edit or delete their posts.
          However, once a completion solution is raised, editing or deletion is restricted to maintain the integrity of the issue resolution process.
          
          <br/><br/><span className=" font-600">3. Responses and Approvals: </span><br/>
          Users are encouraged to engage with posts by providing comments or responses.
          Only the post author has the authority to close an issue.
          If a user is marked as "anonymous," all comments or responses will also be displayed as "anonymous."

          <br/><br/><span className=" font-600">4. Adult Content Reporting:</span><br/>
          Any posts containing adult content posted anonymously will lead to the submission of the post author's username for visibility.

          <br/><br/><span className=" font-600">5. Closing Issues:</span><br/>
          Once the post issue status is set to "closed" by the author, it will be displayed in the Cleared Issues page.
          Closure of an issue signifies that the concern has been addressed to the satisfaction of the author.
          </p><br/>
          <p className="sub-heading font-800">Conclusion</p><br/>
          <p className="font-Nota text-justified font-500" style={{fontStyle: "italic"}}>
            We believe in fostering a supportive and constructive community. By adhering to these guidelines, we aim to maintain a transparent and efficient process for issue resolution. Thank you for contributing to the improvement of our platform!
          </p>
          <br /><br/>
        </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
    </Grid>
  );
};

export default About;
