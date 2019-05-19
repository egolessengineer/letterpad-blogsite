import styled from "styled-components";

const StyledArticle = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  ul,
  ol {
    padding-left: 20px;
    margin: initial;
    list-style-type: initial;
  }
  .prism-dark {
    background: #252424;
    color: #fff;
    padding: 4px 8px;
    font-size: 14px;
  }

  .post-header {
    max-width: 740px;
    margin: auto;
    padding: 0px 1.3rem;

    @media (min-width: 740px) {
      width: 740px;
    }
  }
`;

export default StyledArticle;
