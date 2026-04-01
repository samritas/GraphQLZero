import { MessageSquare } from "lucide-react";

export type CommentExpandedMessageRowProps = {
  commentId: string;
  body: string;
  isFlagged: boolean;
  onApprove: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onMarkFlagged: (commentId: string) => void;
};

export function CommentExpandedMessageRow({
  commentId,
  body,
  isFlagged,
  onApprove,
  onDelete,
  onMarkFlagged,
}: CommentExpandedMessageRowProps) {
  return (
    <div className="mx-4 mb-4 rounded-[10px] border border-[#dbe3ee] bg-white px-6 py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8effa]">
          <MessageSquare className="h-[18px] w-[18px] text-[#0048C1]" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0048C1]">
            Full Message Body
          </p>
          <p className="mt-3 text-[15px] leading-[1.55] text-[#374151]">
            <span aria-hidden>"</span>
            <span className="whitespace-pre-wrap">{body}</span>
            <span aria-hidden>"</span>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => onApprove(commentId)}
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0048C1] transition hover:text-[#003a9e]"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => onDelete(commentId)}
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9f1239] transition hover:text-[#881337]"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => onMarkFlagged(commentId)}
              disabled={isFlagged}
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] transition hover:text-[#4b5563] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isFlagged ? "Flagged" : "Mark as Spam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
