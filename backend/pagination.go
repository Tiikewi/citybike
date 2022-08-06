package main

const (
	paginationDefaultLimit = 100
	paginationMaxLimit     = 1000
)

type PaginationReq struct {
	Limit int `query:"limit"`
	Page  int `query:"page" validate:"min=0"`
}

type Pagination struct {
	Limit  int
	Offset int
}

func pagination(p PaginationReq) Pagination {
	if p.Limit > paginationMaxLimit {
		p.Limit = paginationMaxLimit
	}
	if p.Limit < 1 {
		p.Limit = paginationDefaultLimit
	}
	return Pagination{Limit: p.Limit, Offset: p.Page * p.Limit}
}
