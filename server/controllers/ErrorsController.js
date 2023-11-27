const { getTodayTimeFormat } = require("../config/Calculation");
const ErrorsModel = require("../models/Errors");

class ErrorsController {
  /**
   * 모든 에러게시물 가져오기
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getAllErrors = async (req, res) => {
    try {
      let results = await ErrorsModel.getAllErrors();
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 특정 사용자 에러게시물 가져오기
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getUserErrors = async (req, res) => {
    const userId = req.query.userId;
    const offset = req.query.offset;
    const publicOnly = req.query.publicOnly === "true";
    const solvedOnly = req.query.solvedOnly === "true";
    const privateOnly = req.query.privateOnly === "true";
    const unsolvedOnly = req.query.unsolvedOnly === "true";
    const filter = req.query.filter;
    try {
      let results = await ErrorsModel.getUserErrors(
        parseInt(userId),
        parseInt(offset),
        publicOnly,
        solvedOnly,
        privateOnly,
        unsolvedOnly,
        filter
      );
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 특정 사용자 에러게시물 개수
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getUserErrorsCount = async (req, res) => {
    const userId = req.query.userId;
    try {
      let results = await ErrorsModel.getUserErrorsCount(parseInt(userId));
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  /**
   * 에러 게시물 등록
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static writeError = async (req, res) => {
    try {
      const write_date = getTodayTimeFormat();
      const {
        title,
        tags,
        error_state,
        error_cause,
        error_process,
        error_solved,
        error_result,
        writer_id,
        publicCheck,
      } = req.body;
      let results = await ErrorsModel.writeError(
        title,
        tags,
        error_state,
        error_cause,
        error_process,
        error_solved,
        error_result,
        write_date,
        writer_id,
        publicCheck
      );
      if (results) res.send("게시물 등록 성공! [ErrorsController]]");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 등록 ErrorsController]");
    }
  };
  /**
   * 특정 게시물 삭제
   *
   * @param {request}
   * @param {response}
   * @method DELETE
   *
   * @returns {array}
   */
  static deleteError = async (req, res) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.deleteError(id);
      if (result) res.send("에러 게시글 삭제 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };
  /**
   * 특정 게시물 조회
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static postViewCount = async (req, res) => {
    try {
      const boardId = req.query.boardId;
      if (!boardId) {
        return res.status(400).send("boardId가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.postViews(boardId);
      if (result) res.send("게시글 View + 1 [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 조회수 Controller]");
    }
  };

  /**
   * 특정 게시물 댓글목록
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getErrorsReplies = async (req, res) => {
    try {
      const boardId = req.query.boardId;
      const offset = req.query.offset;
      if (!boardId) {
        return res.status(400).send("BoardId가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.getErrorReplies(boardId, offset);
      if (result) res.send(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 댓글 load Controller]");
    }
  };

  /**
   * 에러 게시물 댓글 등록
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static writeReply = async (req, res) => {
    try {
      const write_date = getTodayTimeFormat();
      const { content, writer_id, content_id } = req.body;
      let results = await ErrorsModel.writeReply(
        content,
        writer_id,
        content_id,
        write_date
      );
      if (results) {
        res.json({
          data: { ...req.body, write_date },
          message: "댓글 등록 성공! [ErrorsController]]",
        });
      } else {
        res.status(500).send("댓글 등록 실패!");
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 답글 등록 ErrorsController]");
    }
  };
  /**
   * 특정 게시물 댓글 삭제
   *
   * @param {request}
   * @param {response}
   * @method DELETE
   *
   */
  static deleteReply = async (req, res) => {
    try {
      const commentId = req.query.commentId;
      if (!commentId) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.deleteReply(commentId);
      if (result) res.send("게시글 댓글 삭제 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };
  /**
   * 특정 게시물 댓글 수정
   *
   * @param {request}
   * @param {response}
   * @method UPDATE
   *
   */
  static updateReply = async (req, res) => {
    try {
      const commentId = req.query.commentId;
      const { content } = req.body;
      let results = await ErrorsModel.updateReply(commentId, content);
      if (results) {
        res.json({
          data: { content, commentId },
          message: "댓글 수정 성공! [ErrorsController]]",
        });
      } else {
        res.status(500).send("댓글 수정 실패!");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };

  /**
   *  댓글 개수
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getRepliesCount = async (req, res) => {
    const contentId = req.query.contentId;
    try {
      let results = await ErrorsModel.getRepliesCount(parseInt(contentId));
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  /**
   * 특정 대댓글 개수
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getCommentsCount = async (req, res) => {
    const replyId = req.query.replyId;
    try {
      let results = await ErrorsModel.getCommentsCount(parseInt(replyId));
      if (results) res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  /**
   * 특정 게시물 댓글목록
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   * @returns {array}
   */
  static getErrorsComments = async (req, res) => {
    try {
      const commentId = req.query.commentId;
      if (!commentId) {
        return res.status(400).send("commentId가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.getComments(commentId);
      if (result) res.send(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 댓글 load Controller]");
    }
  };

  /**
   * 에러 게시물 대댓글 등록
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static writeComment = async (req, res) => {
    try {
      const replyId = req.query.replyId;
      const writerId = req.query.writerId;
      const write_date = getTodayTimeFormat();
      const { content } = req.body;
      let results = await ErrorsModel.writeComment(
        content,
        replyId,
        writerId,
        write_date
      );
      if (results) res.send("게시물 답글 등록 성공! [ErrorsController]]");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Internal Server Error:[게시물 답글 등록 ErrorsController]");
    }
  };
  /**
   * 게시물 대댓글 수정
   *
   * @param {request}
   * @param {response}
   * @method UPDATE
   *
   */
  static updateComment = async (req, res) => {
    try {
      const commentId = req.query.commentId;
      const { content } = req.body;
      let result = await ErrorsModel.updateComment(commentId, content);
      if (result) res.send("게시글 대댓글 수정 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };
  /**
   * 게시물 대댓글 삭제
   *
   * @param {request}
   * @param {response}
   * @method DELETE
   *
   */
  static deleteComment = async (req, res) => {
    try {
      const commentId = req.query.commentId;
      if (!commentId) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.deleteComment(commentId);
      if (result) res.send("게시글 댓글 삭제 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };

  /**
   * 답글 연관 대댓글 삭제
   *
   * @param {request}
   * @param {response}
   * @method DELETE
   *
   */
  static deleteCommentsAll = async (req, res) => {
    try {
      const replyId = req.query.replyId;
      if (!replyId) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.deleteCommentsAll(replyId);
      if (result) res.send("게시글 댓글 삭제 성공! [Controller]]");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error:[게시물 삭제 Controller]");
    }
  };
  /**
   * 댓글 좋아요 체크
   *
   * @param {request}
   * @param {response}
   * @method GET
   *
   */
  static getReplyLikeCheck = async (req, res) => {
    try {
      const replyId = req.query.replyId;
      const userId = req.query.userId;
      if (!replyId || !userId) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      let result = await ErrorsModel.checkUserReplyLiked(replyId, userId);
      const isLiked =
        Array.isArray(result) && result.length > 0 && result[0].count_likes > 0;
      res.send({ isLiked });
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * 댓글 좋아요 로직
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static postReplyLike = async (req, res) => {
    try {
      const replyId = req.query.replyId;
      const userId = req.query.userId;
      if (!replyId || !userId) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      // like row + 1 적용
      let resultLiked = await ErrorsModel.postReplyLike(replyId);
      // like table 추가
      let resultLikesPost = await ErrorsModel.postReplyLikeUser(
        replyId,
        userId
      );
      if (resultLiked && resultLikesPost)
        res.send("댓글 좋아요 완료 [Controller]]");
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * 댓글 좋아요 취소 로직
   *
   * @param {request}
   * @param {response}
   * @method POST
   *
   */
  static postReplyCancelLike = async (req, res) => {
    try {
      const replyId = req.query.replyId;
      const userId = req.query.userId;
      if (!replyId || !userId) {
        return res.status(400).send("id가 존재하지 않습니다.");
      }
      // like row - 1 적용
      let resultCancelLiked = await ErrorsModel.postReplyCancelLike(replyId);
      // like table 삭제
      let resultCancelLikesPost = await ErrorsModel.postReplyCancelLikeUser(
        userId
      );
      if (resultCancelLiked && resultCancelLikesPost)
        res.send("댓글 좋아요 취소 완료 [Controller]]");
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = ErrorsController;
